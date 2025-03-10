using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Text;
using StackExchange.Redis;
using Vehix.WebAPI.Attributes;
using Vehix.WebAPI.Config;
using Vehix.WebAPI.Core;
using Vehix.WebAPI.Models;
using Vehix.WebAPI.Models.Enums;
using Vehix.WebAPI.Services.Interfaces;

namespace Vehix.WebAPI.Middlewares
{
    public class ApiKeyMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IMongoCollection<Key> _collection;
        private readonly IConfiguration _configuration;
        private readonly ILogger<ApiKeyMiddleware> _logger;
        private readonly IApiKeyRedisService _apiKeyRedisService;
        private readonly IDatabase _db;

        public ApiKeyMiddleware(RequestDelegate next, IOptions<MongoDbSettings> mongoDbSettings, IConfiguration configuration, ILogger<ApiKeyMiddleware> logger, IApiKeyRedisService apiKeyRedisService, IConnectionMultiplexer redis)
        {
            var client = new MongoClient(mongoDbSettings.Value.ConnectionUri);
            var database = client.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _collection = database.GetCollection<Key>("Keys");
            _next = next;
            _configuration = configuration;
            _logger = logger;
            _apiKeyRedisService = apiKeyRedisService;
            _db = redis.GetDatabase();
        }


        public async Task InvokeAsync(HttpContext context)
        {
            var endpoint = context.GetEndpoint();
            var hasApiKeyAttribute = endpoint?.Metadata.GetMetadata<AuthorizeApiKeyAttribute>() != null;

            if (hasApiKeyAttribute)
            {
                if (!context.Request.Headers.TryGetValue(_configuration["ApiKey:HeaderName"]!, out var extractedApiKey))
                {
                    context.Response.StatusCode = 401;
                    var ip = context.Response.HttpContext.Connection.RemoteIpAddress;
                    await context.Response.WriteAsync("API Key was not provided.");
                    _logger.LogWarning("API Key was not provided. From: {ip}", ip);
                    return;
                }

                var isApiKeyCached = await _apiKeyRedisService.CheckCachedApiKeyAndIncreaseUsageAsync(extractedApiKey!);

                if (!isApiKeyCached)
                {
                    if (!await IsValidApiKey(extractedApiKey!))
                    {
                        context.Response.StatusCode = 401;
                        var ip = context.Response.HttpContext.Connection.RemoteIpAddress;
                        await context.Response.WriteAsync("Unauthorized client.");
                        _logger.LogWarning("Unauthorized client. ApiKey: {extractedApiKey} From: {ip}", extractedApiKey, ip);
                        return;
                    }
                }
                
            }

            var hasFrontendAttribute = endpoint?.Metadata.GetMetadata<AuthorizeOnlyFrontendAttribute>() != null;

            if (hasFrontendAttribute)
            {
                if (!context.Request.Headers.TryGetValue(_configuration["ApiKey:HeaderName"]!, out var extractedApiKey))
                {
                    context.Response.StatusCode = 401;
                    var ip = context.Response.HttpContext.Connection.RemoteIpAddress;
                    await context.Response.WriteAsync("API Key was not provided.");
                    _logger.LogWarning("API Key was not provided. From: {ip}", ip);
                    return;
                }

                var header = context.Request.Headers.Origin.ToString();
                if (string.IsNullOrEmpty(header))
                {
                    context.Response.StatusCode = 401; 
                    await context.Response.WriteAsync("Unauthorized client.");
                    return;
                }
                var splitter = SplitData(extractedApiKey!);
                if (!splitter.Success)
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("Unauthorized client.");
                    return;
                }
                var splitterData = splitter.Data;
                var userData = await GetUserDataAsync(splitterData!);
                if (!CheckFrontendData(userData, header))
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("Unauthorized client.");
                    return;
                }
                var isApiKeyCached = await _apiKeyRedisService.CheckCachedApiKeyAndIncreaseUsageAsync(extractedApiKey!);

                if (!isApiKeyCached)
                {
                    if (!await IsFrontendApiKey(extractedApiKey!,splitterData!, userData))
                    {
                        context.Response.StatusCode = 401;
                        var ip = context.Response.HttpContext.Connection.RemoteIpAddress;
                        await context.Response.WriteAsync("Unauthorized client.");
                        _logger.LogWarning("Unauthorized client. ApiKey: {extractedApiKey} From: {ip}", extractedApiKey, ip);
                        return;
                    }
                }

            }

            await _next(context);

            context.Response.OnCompleted(async () =>
            {
                context.Request.Headers.TryGetValue(_configuration["ApiKey:HeaderName"]!, out var extractedApiKey);
                var apiKey = extractedApiKey.FirstOrDefault();
                if (apiKey != null)
                {
                    var key = $"ApiKey:{apiKey}";
                    await _db.HashSetAsync(key, "LastResponse", context.Response.StatusCode);
                }
            });
        }

        private async Task<bool> IsValidApiKey(string apiKey)
        {
            var splitter = SplitData(apiKey);
            if (!splitter.Success)
            {
                return false;
            }

            var splitterData = splitter.Data;

            var objectId = new ObjectId(splitterData!.UserId);
            var filter = Builders<Key>.Filter.Eq("_id", objectId);
            var userData = await (await _collection.FindAsync(filter)).FirstOrDefaultAsync();

            if (userData == null)
            {
                return false;
            }

            if (userData.ExpirationDate <= DateTimeOffset.UtcNow && userData.State != EntityState.Expired)
            {
                var expireUpdate = Builders<Key>.Update.Set(c => c.State, EntityState.Expired);
                await _collection.UpdateOneAsync(filter, expireUpdate);
                return false;
            }

            if (userData.State != EntityState.Active)
            {
                return false;
            }

            var isValid = BCrypt.Net.BCrypt.Verify(splitterData.ApiKey, userData.ApiKey);
            if (!isValid)
            {
                return false;
            }

            var expirationTime = TimeSpan.FromMinutes(15);
            await _apiKeyRedisService.CacheApiKeyAsync(apiKey, userData.UserId, expirationTime);
            return true;
        }

        private async Task<bool> IsFrontendApiKey(string apiKey, KeySplitter splitter, Key userData)
        {
            var isValid = BCrypt.Net.BCrypt.Verify(splitter.ApiKey, userData.ApiKey);
            if (!isValid)
            {
                return false;
            }

            var expirationTime = TimeSpan.FromMinutes(15);
            await _apiKeyRedisService.CacheApiKeyAsync(apiKey, userData.UserId, expirationTime);
            return true;
        }

        private bool CheckFrontendData(Key userData, string header)
        {
            var frontendHeader = _configuration["ApiKey:Header"];
            if (frontendHeader != header)
            {
                return false;
            }

            var frontendUsername = _configuration["ApiKey:Username"];
            if (frontendUsername != userData.Username)
            {
                return false;
            }

            var frontendId = _configuration["ApiKey:Id"];
            if (frontendId != userData.UserId)
            {
                return false;
            }

            var frontendEmail = _configuration["ApiKey:Email"];
            if (frontendEmail != userData.Email)
            {
                return false;
            }

            return true;
        }

        private ServiceResult<KeySplitter> SplitData(string apiKey)
        {
            try
            {
                var encodedId = apiKey[^32..];
                var hashedApiKey = apiKey[..43];
                var userId = Encoding.UTF8.GetString(Convert.FromBase64String(encodedId));

                var splitter = new KeySplitter()
                {
                    ApiKey = hashedApiKey,
                    UserId = userId
                };
                return ServiceResult<KeySplitter>.SuccessResult(splitter);
            }
            catch (Exception)
            {
                return ServiceResult<KeySplitter>.FailureResult("");
            }
        }

        private async Task<Key> GetUserDataAsync(KeySplitter splitter)
        {
            var objectId = new ObjectId(splitter.UserId);
            var filter = Builders<Key>.Filter.Eq("_id", objectId);
            var userData = await _collection.FindAsync(filter).Result.FirstOrDefaultAsync();
            return userData;
        }
    }
}

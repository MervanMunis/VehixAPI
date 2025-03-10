using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using Vehix.WebAPI.Config;
using Vehix.WebAPI.Core;
using Vehix.WebAPI.Models;
using Vehix.WebAPI.Models.Enums;
using Vehix.WebAPI.Services.Interfaces;

namespace Vehix.WebAPI.Services
{
    public class KeyService : IKeyService
    {
        private readonly IMongoCollection<Key> _collection;
        private readonly ILogger<AuthService> _logger;
        private readonly IEmailService _emailService;
        private readonly IDatabase _db;

        public KeyService(IOptions<MongoDbSettings> mongoDbSettings, ILogger<AuthService> logger, IEmailService emailService, IConnectionMultiplexer redis)
        {
            var client = new MongoClient(mongoDbSettings.Value.ConnectionUri);
            var database = client.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _collection = database.GetCollection<Key>("Keys");
            _logger = logger;
            _emailService = emailService;
            _db = redis.GetDatabase();
        }

        public async Task<ServiceResult<string>> CreateFrontendApiKey(Key key)
        {
            try
            {
                if (key.ApiKey.IsNullOrEmpty())
                {
                    _logger.LogError("API Key information is missing to create a entity.");
                    return ServiceResult<string>.FailureResult("Could not found the expected information for creating entity!");
                }

                var filter = Builders<Key>.Filter.Eq("Username", key.Username);
                var keyData = await (await _collection.FindAsync(filter)).ToListAsync();

                if (keyData.Count > 1)
                {
                    await _collection.DeleteManyAsync(filter);
                    _logger.LogError("Found more than one Frontend APIKey and cleared all keys to create new!");
                }

                if (keyData.Count == 1)
                {
                    var validKey = keyData.FirstOrDefault();
                    if (validKey==null)
                    {
                        return ServiceResult<string>.FailureResult("An error occurred while creating APIKey.");
                    }


                    if (BCrypt.Net.BCrypt.Verify(key.ApiKey, validKey.ApiKey))
                    {
                        _logger.LogInformation("Frontend APIKey is valid.");
                        return ServiceResult<string>.SuccessResult("APIKey already exists.");
                    }

                    _logger.LogError("Frontend APIKey is not valid. Entity deleted to create new!");
                    await _collection.DeleteManyAsync(filter);
                }

                key.ApiKey = BCrypt.Net.BCrypt.HashPassword(key.ApiKey);

                await _collection.InsertOneAsync(key);
                _logger.LogInformation("New Frontend APIKey is created on database.");
                return ServiceResult<string>.SuccessResult("APIKey is created.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating APIKey.");
                return ServiceResult<string>.FailureResult("An error occurred while creating APIKey.");
            }
        }

        private async Task<ServiceResult<string>> CreateApiKey(string email)
        {
            var userName = email.Split("@")[0];

            var token = GenerateToken(32);

            var entityId = ObjectId.GenerateNewId().ToString();

            var hashedToken = BCrypt.Net.BCrypt.HashPassword(token);

            var encryptedId = Convert.ToBase64String(Encoding.UTF8.GetBytes(entityId));

            var apiKey = $"{token}{encryptedId}";

            var userApiKey = new Key()
            {
                UserId = entityId,
                Username = userName,
                Email = email,
                LastResponseCode = "",
                ApiKey = hashedToken,
                CreatedAt = DateTimeOffset.Now,
                ExpirationDate = DateTimeOffset.Now.AddMonths(1),
                State = EntityState.Active,
                UsageCount = 0,
            };

            await _collection.InsertOneAsync(userApiKey);
            return ServiceResult<string>.SuccessResult(apiKey);
        }

        public async Task<ServiceResult<bool>> RequestApiKey(string user)
        {
            if (user.IsNullOrEmpty()) return ServiceResult<bool>.FailureResult("Invalid Email.");

            var activeKeyFilter = Builders<Key>.Filter.Eq("Email", user) & Builders<Key>.Filter.Eq("State", EntityState.Active);
            var activeKeyExists = await (await _collection.FindAsync(activeKeyFilter)).AnyAsync();

            if (activeKeyExists)
            {
                return ServiceResult<bool>.FailureResult("An active API key already exists for this email.");
            }

            var mailResult = await _emailService.SendEmailAsync(user);

            return mailResult.Success ? ServiceResult<bool>.SuccessResult(true) : ServiceResult<bool>.FailureResult(mailResult.ErrorMessage!);
        }

        public async Task<ServiceResult<string>> VerifyApiKeyRequest(string token)
        {
            var key = $"ApiKeyVerificationKey:{token}";
            var email = await _db.StringGetAsync(key);
            if (email.IsNullOrEmpty) return ServiceResult<string>.FailureResult("");

            var apiKey = await CreateApiKey(email!);
            await _db.KeyDeleteAsync(key);
            if (apiKey.Data.IsNullOrEmpty() && apiKey.Data!.Length != 75)
            {
                return ServiceResult<string>.FailureResult("Invalid or unexpected api key.");
            }
            return ServiceResult<string>.SuccessResult(apiKey.Data!);
        }

        private static string GenerateToken(int lenght)
        {
            var apiKeyBytes = new byte[lenght];
            RandomNumberGenerator.Fill(apiKeyBytes);
            return Convert.ToBase64String(apiKeyBytes).TrimEnd('=').Replace('+', '-').Replace('/', '_');
        }
    }
}

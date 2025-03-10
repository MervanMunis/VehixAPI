using StackExchange.Redis;
using Vehix.WebAPI.Services.Interfaces;

namespace Vehix.WebAPI.Services
{
    public class ApiKeyRedisService(IConnectionMultiplexer redis) : IApiKeyRedisService
    {
        private readonly IDatabase _db = redis.GetDatabase();

        public async Task CacheApiKeyAsync(string apiKey, string userId, TimeSpan expirationTime)
        {
            try
            {
                var key = $"ApiKey:{apiKey}";
                var hashEntries = new HashEntry[]
                {
                new("UserId", userId),
                new("UsageCount", 0),
                new("LastResponse", "")
                };
                await _db.HashSetAsync(key, hashEntries);
                await _db.KeyExpireAsync(key, expirationTime);
                var ttlKey = $"ApiKeyTTL:{apiKey}";
                await _db.StringSetAsync(ttlKey, "TTL", expirationTime.Subtract(TimeSpan.FromMinutes(5)));
            }
            catch (RedisException ex)
            {
                // Consider retry logic here
                throw new Exception("Failed to cache API key in Redis.", ex);
            }
        }

        // Check if the API key is cached in Redis
        public async Task<string?> GetCachedApiKeyAsync(string apiKey)
        {
            try
            {
                var key = $"ApiKey:{apiKey}";
                var cachedUserId = await _db.HashGetAsync(key, "UserId");
                return cachedUserId.HasValue ? cachedUserId.ToString() : null;
            }
            catch (RedisException ex)
            {
                throw new Exception("Failed to retrieve cached UserID for API key from Redis.", ex);
            }
        }

        public async Task<bool> CheckCachedApiKeyAndIncreaseUsageAsync(string apiKey)
        {
            try
            {
                var key = $"ApiKey:{apiKey}";
                if (!await _db.KeyExistsAsync(key)) return false;
                await _db.HashIncrementAsync(key, "UsageCount");
                return true;
            }
            catch (RedisException ex)
            {
                throw new Exception("Failed to check cached API key in Redis.", ex);
            }
        }

        // Remove the API key from the Redis cache
        public async Task RemoveCachedApiKeyAsync(string apiKey)
        {
            try
            {
                var key = $"ApiKey:{apiKey}";
                await _db.KeyDeleteAsync(key);
            }
            catch (RedisException ex)
            {
                throw new Exception("Failed to remove API key from Redis.", ex);
            }
        }

        public async Task<bool> IsRateLimitExceededAsync(string key, int limit, TimeSpan period)
        {
            var rateLimitKey = $"RateLimit:{key}";
            var currentCount = await _db.StringIncrementAsync(rateLimitKey);

            if (currentCount == 1)
            {
                await _db.KeyExpireAsync(rateLimitKey, period);
            }

            return currentCount > limit;
        }
    }
}
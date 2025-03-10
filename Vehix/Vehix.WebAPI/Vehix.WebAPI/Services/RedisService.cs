using StackExchange.Redis;
using Vehix.WebAPI.Services.Interfaces;

namespace Vehix.WebAPI.Services
{
    public class RedisService(IConnectionMultiplexer redis) : IRedisService
    {
        private readonly IDatabase _db = redis.GetDatabase();

        // Save hashed refresh token and the user ID associated with it
        public void SaveRefreshTokenToRedis(string userId, string refreshToken, TimeSpan expiryDate)
        {
            try
            {
                var rtfu = $"RTfU:{refreshToken}";

                // Store the refresh token and associated user ID
                _db.StringSet(rtfu, userId, expiryDate);
            }
            catch (RedisException ex)
            {
                throw new Exception("Failed to save refresh token in Redis.", ex);
            }
        }

        // Retrieves the user ID associated with the hashed refresh token
        public string? GetUserIdFromRefreshToken(string refreshToken)
        {
            try
            {
                return _db.StringGet($"RTfU:{refreshToken}");
            }
            catch (RedisException ex)
            {
                throw new Exception("Failed to retrieve user ID from refresh token in Redis.", ex);
            }
        }

        // Retrieves the refresh token for a specific user and device
        public string? GetRefreshToken(string username, string deviceId)
        {
            try
            {
                var key = $"RefreshToken:{username}:{deviceId}";
                var token = _db.StringGet(key);
                return token.HasValue ? token.ToString() : null;
            }
            catch (RedisException ex)
            {
                throw new Exception("Failed to retrieve refresh token in Redis.", ex);
            }
        }

        // Removes the refresh token and its associated user ID from Redis
        public void RemoveRefreshToken(string refreshToken)
        {
            try
            {
                var key = $"RTfU:{refreshToken}";

                _db.KeyDelete(key);
            }
            catch (RedisException ex)
            {
                throw new Exception("Failed to remove refresh token from Redis.", ex);
            }
        }

        // Adds a token to the blacklist
        public async Task SetTokenToBlacklist(string token, TimeSpan expiryDate)
        {
            try
            {
                await _db.StringSetAsync($"ATBL:{token}", "0", expiryDate);
            }
            catch (RedisException ex)
            {
                throw new Exception("Failed to blacklist token in Redis.", ex);
            }
        }

        // Checks if a token is blacklisted
        public async Task<bool> IsTokenBlacklistedAsync(string accessToken)
        {
            try
            {
                var result = await _db.KeyExistsAsync($"ATBL:{accessToken}");
                return result;
            }
            catch (RedisException ex)
            {
                throw new Exception("Failed to check token blacklist in Redis.", ex);
            }
        }
    }
}

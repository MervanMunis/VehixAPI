namespace Vehix.WebAPI.Services.Interfaces
{
    public interface IRedisService
    {
        Task SetTokenToBlacklist(string token, TimeSpan expiryDate);
        Task<bool> IsTokenBlacklistedAsync(string accessToken);
        void SaveRefreshTokenToRedis(string userId, string refreshToken, TimeSpan expiryDate);
        string? GetRefreshToken(string userId, string deviceId);
        void RemoveRefreshToken(string refreshToken);
        string? GetUserIdFromRefreshToken(string refreshToken);
    }
}

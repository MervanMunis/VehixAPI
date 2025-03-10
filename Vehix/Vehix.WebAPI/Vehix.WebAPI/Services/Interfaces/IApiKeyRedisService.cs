namespace Vehix.WebAPI.Services.Interfaces
{
    public interface IApiKeyRedisService
    {
        Task CacheApiKeyAsync(string apiKey, string userId, TimeSpan expirationTime);
        Task<string?> GetCachedApiKeyAsync(string apiKey);
        Task<bool> CheckCachedApiKeyAndIncreaseUsageAsync(string apiKey);
        Task RemoveCachedApiKeyAsync(string apiKey);
    }
}

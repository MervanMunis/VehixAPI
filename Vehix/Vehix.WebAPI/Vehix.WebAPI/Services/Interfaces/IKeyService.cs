using Vehix.WebAPI.Core;
using Vehix.WebAPI.Models;

namespace Vehix.WebAPI.Services.Interfaces
{
    public interface IKeyService
    {
        Task<ServiceResult<string>> CreateFrontendApiKey(Key key);
        Task<ServiceResult<bool>> RequestApiKey(string user);
        Task<ServiceResult<string>> VerifyApiKeyRequest(string token);
    }
}

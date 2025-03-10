using Vehix.WebAPI.Core;
using Vehix.WebAPI.Models;
using Vehix.WebAPI.Models.DTOs;

namespace Vehix.WebAPI.Services.Interfaces
{
    public interface IAuthService
    {
        Task<ServiceResult<string>> CreateAdminAsync(ApplicationUser applicationUser);
        Task<ServiceResult<string>> Login(LoginRequest loginRequest);
        Task<ServiceResult<bool>> Logout();
        Task<ServiceResult<bool>> CheckAuth();
    }
}

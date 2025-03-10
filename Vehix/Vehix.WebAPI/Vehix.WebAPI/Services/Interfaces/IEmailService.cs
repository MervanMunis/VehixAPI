using Vehix.WebAPI.Core;

namespace Vehix.WebAPI.Services.Interfaces
{
    public interface IEmailService
    {
        Task<ServiceResult<bool>> SendEmailAsync(string toEmail);
        Task<ServiceResult<bool>> SendContactMailAsync(string to, string subject, string message);
    }
}

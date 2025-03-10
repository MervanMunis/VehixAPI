using Asp.Versioning;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vehix.WebAPI.Models;
using Vehix.WebAPI.Services.Interfaces;

namespace Vehix.WebAPI.Controllers
{
    [ApiController]
    [ApiVersion("1")]
    [Route("api/v{version:apiVersion}/contact")]
    public class ContactController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public ContactController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        [EnableCors("FrontendCors")]
        public async Task<IActionResult> SendEmail([FromBody] Email request)
        {
            var result = await _emailService.SendContactMailAsync(request.ToEmail, request.Subject, request.Message);
            if (!result.Success)
            {
                return BadRequest(result.ErrorMessage);
            }
            return Ok(result.Data);
        }
    }
}

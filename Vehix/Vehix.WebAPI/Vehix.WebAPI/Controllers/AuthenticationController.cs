using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Vehix.WebAPI.Models.DTOs;
using Vehix.WebAPI.Services.Interfaces;

namespace Vehix.WebAPI.Controllers
{
    [ApiController]
    [ApiVersion("1")]
    [Route("api/v{version:apiVersion}/auth")]
    public class AuthenticationController(IAuthService authService) : ControllerBase
    {
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var result = await authService.Login(loginRequest);

            if (!result.Success)
            {
                return BadRequest(result.ErrorMessage);
            }

            return new JsonResult(new { success = true, token = result.Data })
            {
                StatusCode = 200 // 200 OK statüsü
            };
        }

        [HttpGet("check")]
        public async Task<IActionResult> CheckAuth()
        {
            var result = await authService.CheckAuth();

            if (!result.Success)
            {
                return BadRequest(result.ErrorMessage);
            }

            return Ok(new { success = true });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var result = await authService.Logout();

            if (!result.Success) 
                return BadRequest(result.ErrorMessage);

            return Ok(new { success = true, message = result.Data });
        }
    }
}

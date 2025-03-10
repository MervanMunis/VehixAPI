using Asp.Versioning;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Vehix.WebAPI.Services.Interfaces;

namespace Vehix.WebAPI.Controllers
{
    [ApiController]
    [ApiVersion("1")]
    [Route("api/v{version:apiVersion}/keys")]
    public class KeysController(IKeyService keyService) : ControllerBase
    {
        [HttpGet("test")]
        [EnableCors("FrontendCors")]
        public Task<IActionResult> Test()
        {
            return Task.FromResult<IActionResult>(Ok());
        }

        [HttpPost("request")]
        [EnableCors("FrontendCors")]
        public async Task<IActionResult> RequestApiKey(string user)
        {
            var result = await keyService.RequestApiKey(user);

            if (!result.Success)
            {
                return BadRequest(result.ErrorMessage);
            }

            return Ok(new { success = true });
        }

        [HttpPost("verify")]
        [EnableCors("FrontendCors")]
        public async Task<IActionResult> VerifyApiKeyRequest(string token)
        {
            var result = await keyService.VerifyApiKeyRequest(token);

            if (!result.Success)
            {
                return BadRequest(result.ErrorMessage);
            }

            return Ok(new { result.Data, result.Success });
        }
    }
}

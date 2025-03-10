using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

namespace Vehix.WebAPI.Controllers
{
    [ApiController]
    [ApiVersion("1")]
    [Route("api/v{version:apiVersion}/health")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetHealth()
        {
            var healthStatus = new
            {
                status = "OK",
            };

            return Ok(healthStatus);
        }
    }
}

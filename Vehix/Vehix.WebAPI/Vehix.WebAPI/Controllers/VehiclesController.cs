using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Vehix.WebAPI.Attributes;
using Vehix.WebAPI.Models.DTOs;
using Vehix.WebAPI.Services.Interfaces;

namespace Vehix.WebAPI.Controllers
{
    [ApiController]
    [ApiVersion("1")]
    [Route("api/v{version:apiVersion}/vehicles")]
    public class VehiclesController : ControllerBase
    {
        public readonly IVehicleService _vehicleService;
        public readonly IVehicleQueryService _vehicleQueryService;

        public VehiclesController(IVehicleService vehicleService, IVehicleQueryService vehicleQueryService)
        {
            _vehicleService = vehicleService;
            _vehicleQueryService = vehicleQueryService;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        [EnableCors("FrontendCors")]
        public async Task<IActionResult> CreateVehicle([FromBody] VehicleRequest vehicle)
        {
            var result = await _vehicleService.CreateVehicleAsync(vehicle);

            if (!result.Success)
            {
                return BadRequest(result.ErrorMessage);
            }

            return Ok(result.Data);
        }

        [HttpPost("bulk")]
        [Authorize(Roles = "Admin")]
        [EnableCors("FrontendCors")]
        public async Task<IActionResult> CreateVehicles([FromBody] List<VehicleRequest> vehicles)
        {
            var result = await _vehicleService.CreateVehiclesAsync(vehicles);

            if (!result.Success)
            {
                return NotFound(result.ErrorMessage);
            }

            return Ok(result.Data);
        }

        [HttpGet("admin")]
        [Authorize(Roles = "Admin")]
        [EnableCors("FrontendCors")]
        public async Task<IActionResult> GetAllVehiclesAdmin()
        {
            var result = await _vehicleQueryService.GetAllVehiclesAsync();

            if (!result.Success)
            {
                return NotFound(result.ErrorMessage);
            }

            return Ok(result);
        }

        [HttpGet("admin/{vehicleType}")]
        [Authorize(Roles = "Admin")]
        [EnableCors("FrontendCors")]
        public async Task<IActionResult> GetVehiclesByVehicleTypeAdminAsync([FromRoute(Name = "vehicleType")] string vehicleType)
        {
            var result = await _vehicleQueryService.GetVehiclesByVehicleTypeAsync(vehicleType);

            if (!result.Success)
            {
                return NotFound(result.ErrorMessage);
            }

            return Ok(result);
        }

        [HttpGet("all")]
        [AuthorizeApiKey]
        [EnableCors("PublicApiCors")]
        public async Task<IActionResult> GetAllVehicles()
        {
            var result = await _vehicleQueryService.GetAllVehiclesAsync();

            if (!result.Success)
            {
                return NotFound(result.ErrorMessage);
            }

            return Ok(result);
        }

        [HttpGet("limited")]
        public async Task<IActionResult> GetAllVehiclesFrontEnd()
        {
            var result = await _vehicleQueryService.GetAllVehiclesFrontEndAsync();

            if (!result.Success)
            {
                return NotFound(result.ErrorMessage);
            }

            return Ok(result);

        }

        [HttpGet("query/vehicle-type/{vehicleType}")]
        [AuthorizeApiKey]
        [EnableCors("PublicApiCors")]
        public async Task<IActionResult> GetVehiclesByVehicleTypeAsync([FromRoute(Name = "vehicleType")] string vehicleType)
        {
            var result = await _vehicleQueryService.GetVehiclesByVehicleTypeAsync(vehicleType);

            if (!result.Success)
            {
                return NotFound(result.ErrorMessage);
            }

            return Ok(result);
        }

        [HttpGet("query/brand/{brand}")]
        [AuthorizeApiKey]
        [EnableCors("PublicApiCors")]
        public async Task<IActionResult> GetVehiclesByBrandAsync([FromRoute(Name = "brand")] string brand)
        {
            var result = await _vehicleQueryService.GetVehiclesByBrandAsync(brand);

            if (!result.Success)
            {
                return NotFound(result.ErrorMessage);
            }

            return Ok(result);
        }

        [HttpGet("query/fuel-type/{fuelType}")]
        [AuthorizeApiKey]
        [EnableCors("PublicApiCors")]
        public async Task<IActionResult> GetVehiclesByFuelTypeAsync([FromRoute(Name = "fuelType")] string fuelType)
        {
            var result = await _vehicleQueryService.GetVehiclesByFuelTypeAsync(fuelType);

            if (!result.Success)
            {
                return NotFound(result.ErrorMessage);
            }

            return Ok(result);
        }

        [HttpGet("query/body-type/{bodyType}")]
        [AuthorizeApiKey]
        [EnableCors("PublicApiCors")]
        public async Task<IActionResult> GetVehiclesByBodyTypeAsync([FromRoute(Name = "bodyType")] string bodyType)
        {
            var result = await _vehicleQueryService.GetVehiclesByBodyTypeAsync(bodyType);

            if (!result.Success)
            {
                return NotFound(result.ErrorMessage);
            }

            return Ok(result);
        }

        [HttpGet("query/isClassic")]
        [AuthorizeApiKey]
        [EnableCors("PublicApiCors")]
        public async Task<IActionResult> GetVehiclesByIsClassicAsync(bool isClassic)
        {
            var result = await _vehicleQueryService.GetVehiclesByIsClassicAsync(isClassic);

            if (!result.Success)
            {
                return NotFound(result.ErrorMessage);
            }

            return Ok(result);
        }

        // Get a car by ID
        [HttpGet("{vehicleId}")]
        [Authorize(Roles = "Admin")]
        [EnableCors("FrontendCors")]
        public async Task<IActionResult> GetVehicleById([FromRoute(Name = "vehicleId")] string vehicleId)
        {
            var result = await _vehicleService.GetVehicleByIdAsync(vehicleId);

            if (!result.Success)
            {
                return NotFound(result.ErrorMessage);
            }

            return Ok(result.Data);
        }

        // Update car information
        [HttpPut("{vehicleId}")]
        [Authorize(Roles = "Admin")]
        [EnableCors("FrontendCors")]
        public async Task<IActionResult> UpdateVehicle([FromRoute(Name = "vehicleId")] string vehicleId, [FromBody] VehicleRequest vehicleRequest)
        {
            var result = await _vehicleService.UpdateVehicleAsync(vehicleId, vehicleRequest);

            if (!result.Success)
            {
                return NotFound(result.ErrorMessage);
            }

            return Ok(result.Data);
        }

        // Delete a car
        [HttpDelete("{vehicleId}")]
        [Authorize(Roles = "Admin")]
        [EnableCors("FrontendCors")]
        public async Task<IActionResult> DeleteVehicle([FromRoute(Name = "vehicleId")] string vehicleId)
        {
            var result = await _vehicleService.DeleteVehicleAsync(vehicleId);

            if (!result.Success)
            {
                return NotFound(result.ErrorMessage);
            }

            return Ok(result.Data);
        }

        // Update car image
        [HttpPut("{vehicleId}/image")]
        [Authorize(Roles = "Admin")]
        [EnableCors("FrontendCors")]
        public async Task<IActionResult> UpdateVehicleImage([FromRoute(Name = "vehicleId")] string vehicleId, IFormFile file)
        {
            var result = await _vehicleService.UpdateVehicleImageAsync(vehicleId, file);

            if (!result.Success)
            {
                return BadRequest(result.ErrorMessage);
            }

            return Ok(result.Data);
        }
    }
}

using Vehix.WebAPI.Core;
using Vehix.WebAPI.Models;
using Vehix.WebAPI.Models.DTOs;

namespace Vehix.WebAPI.Services.Interfaces
{
    public interface IVehicleService
    {
        Task<ServiceResult<Vehicle>> GetVehicleByIdAsync(string vehicleId);

        Task<ServiceResult<Vehicle>> CreateVehicleAsync(VehicleRequest vehicleRequest);

        Task<ServiceResult<string>> CreateVehiclesAsync(List<VehicleRequest> vehicleRequest);

        Task<ServiceResult<Vehicle>> UpdateVehicleAsync(string vehicleId, VehicleRequest vehicleRequest);

        Task<ServiceResult<string>> UpdateVehicleImageAsync(string vehicleId, IFormFile formFile);

        Task<ServiceResult<string>> DeleteVehicleAsync(string vehicleId);
    }
}

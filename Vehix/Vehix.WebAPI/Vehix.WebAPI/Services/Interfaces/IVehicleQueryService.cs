using Vehix.WebAPI.Core;
using Vehix.WebAPI.Models;

namespace Vehix.WebAPI.Services.Interfaces
{
    public interface IVehicleQueryService
    {
        Task<ServiceResult<List<Vehicle>>> GetAllVehiclesAsync();

        Task<ServiceResult<List<Vehicle>>> GetAllVehiclesFrontEndAsync();

        Task<ServiceResult<List<Vehicle>>> GetVehiclesByBrandAsync(string brand);

        Task<ServiceResult<List<Vehicle>>> GetVehiclesByFuelTypeAsync(string fuelType);

        Task<ServiceResult<List<Vehicle>>> GetVehiclesByBodyTypeAsync(string bodyType);

        Task<ServiceResult<List<Vehicle>>> GetVehiclesByIsClassicAsync(bool isClassic);

        Task<ServiceResult<List<Vehicle>>> GetVehiclesByVehicleTypeAsync(string vehicleType);

    }
}

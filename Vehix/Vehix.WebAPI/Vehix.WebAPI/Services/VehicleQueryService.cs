using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Vehix.WebAPI.Config;
using Vehix.WebAPI.Core;
using Vehix.WebAPI.Models;
using Vehix.WebAPI.Services.Interfaces;

namespace Vehix.WebAPI.Services
{
    public class VehicleQueryService : IVehicleQueryService
    {
        private readonly IMongoCollection<Vehicle> _collection;
        private readonly IFileService _fileService;
        private readonly ILogger<VehicleService> _logger;
        private readonly string uri = "https://api.vehixapi.com/images/";

        public VehicleQueryService(IOptions<MongoDbSettings> mongoDbSettings, IFileService fileService, ILogger<VehicleService> logger)
        {
            var client = new MongoClient(mongoDbSettings.Value.ConnectionUri);
            var database = client.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _collection = database.GetCollection<Vehicle>("Vehicles");
            _fileService = fileService;
            _logger = logger;
        }

        public async Task<ServiceResult<List<Vehicle>>> GetAllVehiclesAsync()
        {
            try
            {
                var vehicles = await _collection.Find(new BsonDocument()).ToListAsync();

                // Convert each car's ImageUrl to a public URL if it exists
                foreach (var vehicle in vehicles)
                {
                    if (!string.IsNullOrWhiteSpace(vehicle.ImageUrl)) // Check if ImageUrl is not null or empty
                    {
                        vehicle.ImageUrl = $"{uri}{Path.GetFileName(vehicle.ImageUrl)}";
                    }
                }

                var count = vehicles.Count;
                _logger.LogInformation("Fetched all entities successfully. COUNT: {count}", count);
                return ServiceResult<List<Vehicle>>.SuccessResult(vehicles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while fetching all entities.");
                return ServiceResult<List<Vehicle>>.FailureResult("An unexpected error occurred while fetching all entities.");
            }
        }

        public async Task<ServiceResult<List<Vehicle>>> GetVehiclesByBrandAsync(string brand)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(brand))
                    return ServiceResult<List<Vehicle>>.FailureResult("The brand is expected!");

                brand = CapitalizeFirstLetter(brand);

                var filter = Builders<Vehicle>.Filter.Eq(v => v.Brand, brand);

                var vehicles = await _collection.Find(filter).ToListAsync();

                if (vehicles == null || vehicles.Count == 0)
                {
                    _logger.LogWarning("No vehicles found for the specified brand name: {brand}", brand);
                    return ServiceResult<List<Vehicle>>.FailureResult($"No vehicles found for the specified brand name: {brand}");
                }

                foreach (var vehicle in vehicles)
                {
                    if (!string.IsNullOrWhiteSpace(vehicle.ImageUrl))
                    {
                        vehicle.ImageUrl = $"{uri}{Path.GetFileName(vehicle.ImageUrl)}";
                    }
                }

                return ServiceResult<List<Vehicle>>.SuccessResult(vehicles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while fetching vehicles with Brand: {brand}.", brand);
                return ServiceResult<List<Vehicle>>.FailureResult($"An unexpected error occurred while fetching vehicles with Brand: {brand}.");
            }
        }

        public async Task<ServiceResult<List<Vehicle>>> GetVehiclesByFuelTypeAsync(string fuelType)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(fuelType))
                    return ServiceResult<List<Vehicle>>.FailureResult("The fuel type is expected!");

                fuelType = CapitalizeFirstLetter(fuelType);

                var filter = Builders<Vehicle>.Filter.Eq(v => v.FuelType, fuelType);

                var vehicles = await _collection.Find(filter).ToListAsync();

                if (vehicles == null || vehicles.Count == 0)
                {
                    _logger.LogWarning("No vehicles found for the specified Fuel Type: {fuelType}", fuelType);
                    return ServiceResult<List<Vehicle>>.FailureResult($"No vehicles found for the specified brand Fuel Type: {fuelType}");
                }

                foreach (var vehicle in vehicles)
                {
                    if (!string.IsNullOrWhiteSpace(vehicle.ImageUrl))
                    {
                        vehicle.ImageUrl = $"{uri}{Path.GetFileName(vehicle.ImageUrl)}";
                    }
                }

                return ServiceResult<List<Vehicle>>.SuccessResult(vehicles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while fetching vehicles with Fuel Type: {fuelType}.", fuelType);
                return ServiceResult<List<Vehicle>>.FailureResult($"An unexpected error occurred while fetching vehicles with Fuel Type: {fuelType}.");
            }
        }

        public async Task<ServiceResult<List<Vehicle>>> GetVehiclesByBodyTypeAsync(string bodyType)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(bodyType))
                    return ServiceResult<List<Vehicle>>.FailureResult("The body type is expected!");

                bodyType = CapitalizeFirstLetter(bodyType);

                var filter = Builders<Vehicle>.Filter.Eq(v => v.BodyType, bodyType);

                var vehicles = await _collection.Find(filter).ToListAsync();

                if (vehicles == null || vehicles.Count == 0)
                {
                    _logger.LogWarning("No vehicles found for the specified Body Type: {bodyType}", bodyType);
                    return ServiceResult<List<Vehicle>>.FailureResult($"No vehicles found for the specified brand Body Type: {bodyType}");
                }

                foreach (var vehicle in vehicles)
                {
                    if (!string.IsNullOrWhiteSpace(vehicle.ImageUrl))
                    {
                        vehicle.ImageUrl = $"{uri}{Path.GetFileName(vehicle.ImageUrl)}";
                    }
                }

                return ServiceResult<List<Vehicle>>.SuccessResult(vehicles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while fetching vehicles with Body Type: {bodyType}.", bodyType);
                return ServiceResult<List<Vehicle>>.FailureResult($"An unexpected error occurred while fetching vehicles with Body Type: {bodyType}.");
            }
        }

        public async Task<ServiceResult<List<Vehicle>>> GetVehiclesByIsClassicAsync(bool isClassic = false)
        {
            try
            {
                var filter = Builders<Vehicle>.Filter.Eq(v => v.IsClassic, isClassic);

                var vehicles = await _collection.Find(filter).ToListAsync();

                if (vehicles == null || vehicles.Count == 0)
                {
                    _logger.LogWarning("No vehicles found for the specified IsClassic: {isClassic}", isClassic);
                    return ServiceResult<List<Vehicle>>.FailureResult($"No vehicles found for the specified brand IsClassic: {isClassic}");
                }

                foreach (var vehicle in vehicles)
                {
                    if (!string.IsNullOrWhiteSpace(vehicle.ImageUrl))
                    {
                        vehicle.ImageUrl = $"{uri}{Path.GetFileName(vehicle.ImageUrl)}";
                    }
                }

                return ServiceResult<List<Vehicle>>.SuccessResult(vehicles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while fetching vehicles with IsClassic: {isClassic}.", isClassic);
                return ServiceResult<List<Vehicle>>.FailureResult($"An unexpected error occurred while fetching vehicles with Body Type: {isClassic}.");
            }
        }

        public async Task<ServiceResult<List<Vehicle>>> GetVehiclesByVehicleTypeAsync(string vehicleType)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(vehicleType))
                    return ServiceResult<List<Vehicle>>.FailureResult("The vehicle type is expected!");

                vehicleType = CapitalizeFirstLetter(vehicleType);

                var filter = Builders<Vehicle>.Filter.Eq(v => v.VehicleType, vehicleType);

                var vehicles = await _collection.Find(filter).ToListAsync();

                if (vehicles == null || vehicles.Count == 0)
                {
                    _logger.LogWarning("No vehicles found for the specified vehicle type: {vehicleType}", vehicleType);
                    return ServiceResult<List<Vehicle>>.FailureResult($"No vehicles found for the specified vehicle type: {vehicleType}");
                }

                foreach (var vehicle in vehicles)
                {
                    if (!string.IsNullOrWhiteSpace(vehicle.ImageUrl))
                    {
                        vehicle.ImageUrl = $"{uri}{Path.GetFileName(vehicle.ImageUrl)}";
                    }
                }

                return ServiceResult<List<Vehicle>>.SuccessResult(vehicles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while fetching vehicles with VehicleType: {vehicleType}.", vehicleType);
                return ServiceResult<List<Vehicle>>.FailureResult($"An unexpected error occurred while fetching vehicles with VehicleType: {vehicleType}.");
            }
        }

        public async Task<ServiceResult<List<Vehicle>>> GetAllVehiclesFrontEndAsync()
        {
            try
            {
                // Step 1: Get the top 20 brands by the number of cars they have
                var topBrands = await _collection.Aggregate()
                    .Group(v => v.Brand, g => new { Brand = g.Key, Count = g.Count() })
                    .SortByDescending(g => g.Count)
                    .Limit(20)
                    .ToListAsync();

                var selectedVehicles = new List<Vehicle>();

                // Step 2: Fetch 5 cars from each of these top 20 brands
                foreach (var brand in topBrands.OrderBy(b => b.Brand)) // Ensure brands are sorted alphabetically
                {
                    var brandVehicles = await _collection.Find(v => v.Brand == brand.Brand)
                                                         .SortBy(v => v.Brand) // Assuming Name is used for alphabetical order
                                                         .Limit(5)
                                                         .ToListAsync();

                    selectedVehicles.AddRange(brandVehicles);
                }

                // Step 3: Convert each vehicle's ImageUrl to a public URL if it exists
                foreach (var vehicle in selectedVehicles)
                {
                    if (!string.IsNullOrWhiteSpace(vehicle.ImageUrl)) // Check if ImageUrl is not null or empty
                    {
                        vehicle.ImageUrl = $"{uri}{Path.GetFileName(vehicle.ImageUrl)}";
                    }
                }

                var selectedCount = selectedVehicles.Count;
                _logger.LogInformation("Fetched a subset of entities successfully. SELECTED COUNT: {selectedCount}", selectedCount);
                return ServiceResult<List<Vehicle>>.SuccessResult(selectedVehicles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while fetching entities.");
                return ServiceResult<List<Vehicle>>.FailureResult("An unexpected error occurred while fetching entities.");
            }
        }

        private string CapitalizeFirstLetter(string value)
        {
            return char.ToUpper(value[0]) + value.Substring(1).ToLower();
        }
    }
}

using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Vehix.WebAPI.Config;
using Vehix.WebAPI.Core;
using Vehix.WebAPI.Models;
using Vehix.WebAPI.Models.DTOs;
using Vehix.WebAPI.Services.Interfaces;

namespace Vehix.WebAPI.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IMongoCollection<Vehicle> _collection;
        private readonly IFileService _fileService;
        private readonly ILogger<VehicleService> _logger;
	private readonly string uri = "https://api.vehixapi.com/images/";

        public VehicleService(IOptions<MongoDbSettings> mongoDbSettings, IFileService fileService, ILogger<VehicleService> logger)
        {
            var client = new MongoClient(mongoDbSettings.Value.ConnectionUri);
            var database = client.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _collection = database.GetCollection<Vehicle>("Vehicles");
            _fileService = fileService;
            _logger = logger;
        }

        public async Task<ServiceResult<Vehicle>> CreateVehicleAsync(VehicleRequest vehicleRequest)
        {
            try
            {
                var vehicle = MapVehicleFromRequest(vehicleRequest);
                await _collection.InsertOneAsync(vehicle);
                var id = vehicle.VehicleId;
                _logger.LogInformation("New entity created successfully. ID: {id}.", id);
                return ServiceResult<Vehicle>.SuccessResult(vehicle);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while creating new entity.");
                return ServiceResult<Vehicle>.FailureResult("An unexpected error occurred while creating new entity.");
            }
        }

        public async Task<ServiceResult<string>> CreateVehiclesAsync(List<VehicleRequest> vehicleRequests)
        {
            try
            {
                var vehicles = vehicleRequests.Select(MapVehicleFromRequest).ToList();

                await _collection.InsertManyAsync(vehicles);

                var count = vehicles.Count;
                _logger.LogInformation("New entities created successfully. COUNT: {count}",count);
                return ServiceResult<string>.SuccessResult($"New entities created successfully. COUNT: {vehicleRequests.Count}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while creating new entities.");
                return ServiceResult<string>.FailureResult("An unexpected error occurred while creating new entities.");
            }
        }

        public async Task<ServiceResult<string>> DeleteVehicleAsync(string vehicleId)
        {
            try
            {
                var objectId = new ObjectId(vehicleId);
                var filter = Builders<Vehicle>.Filter.Eq("_id", objectId);

                var result = await _collection.DeleteOneAsync(filter);
                if (result.DeletedCount != 0)
                    return ServiceResult<string>.SuccessResult($"The entity is deleted. ID: {vehicleId}");

                _logger.LogWarning("Could not delete the entity. ID: {vehicleId}", vehicleId);
                return ServiceResult<string>.FailureResult($"Could not delete the entity. ID: {vehicleId}");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while deleting entity with id: {vehicleId}.", vehicleId);
                return ServiceResult<string>.FailureResult($"An unexpected error occurred while deleting entity with id: {vehicleId}.");
            }
        }

        public async Task<ServiceResult<Vehicle>> GetVehicleByIdAsync(string vehicleId)
        {
            try
            {
                var objectId = new ObjectId(vehicleId);
                var filter = Builders<Vehicle>.Filter.Eq("_id", objectId);

                var vehicle = await _collection.FindAsync(filter).Result.FirstOrDefaultAsync();

                if (vehicle == null)
                {
                    _logger.LogWarning("Could not find the expected entity. ID: {vehicleId}", vehicleId);
                    return ServiceResult<Vehicle>.FailureResult($"Could not find the expected entity. ID: {vehicleId}");
                }

                if (!string.IsNullOrWhiteSpace(vehicle.ImageUrl)) // Check if ImageUrl is not null or empty
                {
                    vehicle.ImageUrl = $"{uri}{Path.GetFileName(vehicle.ImageUrl)}";
                }

                return ServiceResult<Vehicle>.SuccessResult(vehicle);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while fetching entity with id: {vehicleId}.", vehicleId);
                return ServiceResult<Vehicle>.FailureResult($"An unexpected error occurred while fetching entity with id: {vehicleId}.");
            }
        }

        public async Task<ServiceResult<Vehicle>> UpdateVehicleAsync(string vehicleId, VehicleRequest vehicleRequest)
        {
            try
            {
                var objectId = new ObjectId(vehicleId);
                var filter = Builders<Vehicle>.Filter.Eq("_id", objectId);

                var update = Builders<Vehicle>.Update
                    .Set(c=> c.VehicleType, vehicleRequest.VehicleType)
                    .Set(c=> c.IsClassic, vehicleRequest.IsClassic)
                    .Set(c => c.Brand, vehicleRequest.Brand)
                    .Set(c => c.Model, vehicleRequest.Model)
                    .Set(c => c.Year, vehicleRequest.Year)
                    .Set(c => c.BodyType, vehicleRequest.BodyType)
                    .Set(c => c.DriveType, vehicleRequest.DriveType)
                    .Set(c => c.FuelType, vehicleRequest.FuelType)
                    .Set(c => c.EngineCapacity, vehicleRequest.EngineCapacity)
                    .Set(c => c.EnginePower, vehicleRequest.EnginePower)
                    .Set(c => c.Transmission, vehicleRequest.Transmission)
                    .Set(c => c.Package, vehicleRequest.Package);

                var result = await _collection.UpdateOneAsync(filter, update);
                var vehicle = await _collection.FindAsync(filter).Result.FirstOrDefaultAsync();

                if (result.ModifiedCount > 0)
                    return ServiceResult<Vehicle>.SuccessResult(vehicle);

                _logger.LogWarning("No entity found or no changes were made. ID: {vehicleId}.", vehicleId);
                return ServiceResult<Vehicle>.FailureResult($"No entity found or no changes were made. ID: {vehicleId}.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while updating entity with id: {vehicleId}.", vehicleId);
                return ServiceResult<Vehicle>.FailureResult($"An unexpected error occurred while updating entity with id: {vehicleId}.");
            }
        }

        public async Task<ServiceResult<string>> UpdateVehicleImageAsync(string vehicleId, IFormFile formFile)
        {
            try
            {
                var objectId = new ObjectId(vehicleId);
                var filter = Builders<Vehicle>.Filter.Eq("_id", objectId);

                var vehicle = await _collection.FindAsync(filter).Result.FirstOrDefaultAsync();
                if (vehicle == null)
                {
                    _logger.LogWarning("Could not find the expected entity. ID: {vehicleId}", vehicleId);
                    return ServiceResult<string>.FailureResult($"Could not find the expected entity. ID: {vehicleId}");
                }

                if (vehicle.ImageUrl != null)
                    await _fileService.DeleteFileAsync(vehicle.ImageUrl);

                var filePath = await _fileService.SaveFileAsync(formFile);

                var update = Builders<Vehicle>.Update.Set(c => c.ImageUrl, filePath);
                var result = await _collection.UpdateOneAsync(filter, update);

                if (result.ModifiedCount == 0)
                {
                    _logger.LogWarning("No changes were made to the image url for entity. ID: {vehicleId}.", vehicleId);
                    return ServiceResult<string>.FailureResult($"No changes were made to the image url for entity. ID: {vehicleId}.");
                }

                _logger.LogInformation("Image url for entity is updated. ID: {vehicleId}",vehicleId);
                return ServiceResult<string>.SuccessResult($"Image url for entity is updated. ID: {vehicleId}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while updating the image url for entity with id: {vehicleId}.", vehicleId);
                return ServiceResult<string>.FailureResult($"An unexpected error occurred while updating the image url for entity with id: {vehicleId}.");
            }
        }

        private static Vehicle MapVehicleFromRequest(VehicleRequest vehicleRequest)
        {
            var car = new Vehicle
            {
                VehicleId = null!,
                VehicleType = vehicleRequest.VehicleType,
                Brand = vehicleRequest.Brand,
                BodyType = vehicleRequest.BodyType,
                EngineCapacity = vehicleRequest.EngineCapacity,
                DriveType = vehicleRequest.DriveType,
                EnginePower = vehicleRequest.EnginePower,
                FuelType = vehicleRequest.FuelType,
                ImageUrl = null,
                Model = vehicleRequest.Model,
                Package = vehicleRequest.Package,
                Year = vehicleRequest.Year,
                Transmission = vehicleRequest.Transmission,
                IsClassic = vehicleRequest.IsClassic
            };

            return car;
        }
    }
}

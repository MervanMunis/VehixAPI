using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Vehix.WebAPI.Models
{
    public class Vehicle
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonPropertyName("VehicleId")]
        public string VehicleId { get; init; } = ObjectId.GenerateNewId().ToString();

        [JsonPropertyName("VehicleType")]
        public string VehicleType { get; init; } = string.Empty;

        [JsonPropertyName("Brand")]
        public string Brand { get; init; } = string.Empty;

        [JsonPropertyName("Model")]
        public string Model { get; init; } = string.Empty;

        [JsonPropertyName("BodyType")]
        public string BodyType { get; init; } = string.Empty;

        [JsonPropertyName("Package")]
        public string Package { get; init; } = string.Empty;

        [JsonPropertyName("Transmission")]
        public string Transmission { get; init; } = string.Empty;

        [JsonPropertyName("FuelType")]
        public string FuelType { get; init; } = string.Empty;

        [JsonPropertyName("DriveType")]
        public string DriveType { get; init; } = string.Empty;

        [JsonPropertyName("EnginePower")]
        public string? EnginePower { get; init; }

        [JsonPropertyName("EngineCapacity")]
        public string? EngineCapacity { get; init; }

        [JsonPropertyName("Year")]
        public string Year { get; init; } = string.Empty;

        [JsonPropertyName("IsClassic")]
        [BsonRepresentation(BsonType.Boolean)]
        public bool IsClassic { get; init; }

        [JsonPropertyName("ImageUrl")]
        public string? ImageUrl { get; set; }
    }
}

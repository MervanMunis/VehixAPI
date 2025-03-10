using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Vehix.WebAPI.Models.Enums;

namespace Vehix.WebAPI.Models
{
    public class Key
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonPropertyName("UserId")]
        public string UserId { get; set; } = ObjectId.GenerateNewId().ToString();

        [JsonPropertyName("Username")]
        public string Username { get; set; } = string.Empty;

        [JsonPropertyName("Email")]
        public string Email { get; set; } = string.Empty;

        [JsonPropertyName("ApiKey")]
        public string ApiKey { get; set; } = string.Empty;

        [BsonRepresentation(BsonType.DateTime)]
        [JsonPropertyName("CreatedAt")]
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

        [BsonRepresentation(BsonType.DateTime)]
        [JsonPropertyName("ExpirationDate")]
        public DateTimeOffset ExpirationDate { get; set; } = DateTimeOffset.UtcNow.AddMonths(1);

        [JsonPropertyName("UsageCount")]
        public int UsageCount { get; set; } = 0;

        [JsonPropertyName("LastResponseCode")]
        public string LastResponseCode { get; set; } = string.Empty;

        [JsonPropertyName("LastResponseCode")]
        public EntityState State { get; set; }
    }
}

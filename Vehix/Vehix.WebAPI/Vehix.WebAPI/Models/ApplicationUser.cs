using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Vehix.WebAPI.Models
{
    public class ApplicationUser
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

        public string Username { get; init; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        [JsonIgnore]
        public string Role { get; set; } = string.Empty;
    }
}

using System.ComponentModel.DataAnnotations;

namespace Vehix.WebAPI.Models.DTOs
{
    public class VehicleRequest
    {
        [Required]
        [StringLength(100)]
        public string VehicleType { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Brand { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Model { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string BodyType { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Package { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Transmission { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string FuelType { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string DriveType { get; set; } = string.Empty;

        [StringLength(4)]
        public string? EnginePower { get; set; }

        [StringLength(5)]
        public string? EngineCapacity { get; set; }

        [Required]
        [StringLength(4)]
        public string Year { get; set; } = string.Empty;

        [Required]
        public bool IsClassic { get; set; }
    }
}
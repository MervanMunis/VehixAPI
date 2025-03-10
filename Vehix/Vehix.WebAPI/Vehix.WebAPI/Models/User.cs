using System.ComponentModel.DataAnnotations;

namespace Vehix.WebAPI.Models
{
    public class User
    {
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}

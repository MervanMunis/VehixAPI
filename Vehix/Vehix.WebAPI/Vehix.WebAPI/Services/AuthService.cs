using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;
using Vehix.WebAPI.Config;
using Vehix.WebAPI.Core;
using Vehix.WebAPI.Models;
using Vehix.WebAPI.Models.DTOs;
using Vehix.WebAPI.Services.Interfaces;

namespace Vehix.WebAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly IMongoCollection<ApplicationUser> _collection;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthService> _logger;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IRedisService _redisService;

        public AuthService(IOptions<MongoDbSettings> mongoDbSettings, IConfiguration configuration, ILogger<AuthService> logger, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
        {
            var client = new MongoClient(mongoDbSettings.Value.ConnectionUri);
            var database = client.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _collection = database.GetCollection<ApplicationUser>("ApplicationUser");
            _configuration = configuration;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
            _redisService = redisService;
        }

        public async Task<ServiceResult<string>> CreateAdminAsync(ApplicationUser applicationUser)
        {
            try
            {
                if (applicationUser.Password.IsNullOrEmpty() || applicationUser.Username.IsNullOrEmpty())
                {
                    _logger.LogError("User information is missing to create a new user.");
                    return ServiceResult<string>.FailureResult("Could not found the expected information for creating user!");
                }

                var user = await _collection.FindAsync(new BsonDocument()).Result.ToListAsync();
                var clearFilter = Builders<ApplicationUser>.Filter.Empty;

                if (user.Count > 1)
                {
                    await _collection.DeleteManyAsync(clearFilter);
                    _logger.LogError("Found more than one administrator user and cleared all users to create new administrator!");
                }

                if (user.Count == 1)
                {
                    var validUser = user.FirstOrDefault();
                    
                    if (BCrypt.Net.BCrypt.Verify(applicationUser.Password, validUser!.Password) && applicationUser.Username == validUser.Username)
                    {
                        _logger.LogInformation("Administrator user is valid.");
                        return ServiceResult<string>.SuccessResult("User is already exists.");
                    }

                    _logger.LogError("Administrator user is not valid. User deleted to create new administrator!");
                    await _collection.DeleteManyAsync(clearFilter);
                }

                applicationUser.Role = "Admin";

                applicationUser.Password = BCrypt.Net.BCrypt.HashPassword(applicationUser.Password);

                await _collection.InsertOneAsync(applicationUser);
                _logger.LogInformation("New administrator user is created on database.");
                return ServiceResult<string>.SuccessResult("User is created.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating user.");
                return ServiceResult<string>.FailureResult("An error occurred while creating user.");
            }
        }

        public async Task<ServiceResult<string>> Login(LoginRequest loginRequest)
        {
            try
            {
                var filter = Builders<ApplicationUser>.Filter.Eq("Username", loginRequest.Username);
                var user = await (await _collection.FindAsync(filter)).FirstOrDefaultAsync();
                
                if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password))
                    return ServiceResult<string>.FailureResult("Invalid username or password.");

                var expRtJwt = DateTime.Now.AddDays(1);
                var expAtJwt = DateTime.Now.AddMinutes(15);

                var refreshToken = GenerateJwtRefreshToken(user, expRtJwt);
                var refreshTokenExp = TimeSpan.FromDays(1);

                _redisService.SaveRefreshTokenToRedis(user.Id, refreshToken[0], refreshTokenExp);

                var accessToken = GenerateJwtToken(user, expAtJwt);

                // Set HttpOnly Cookie for the JWT token
                var rtCookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTimeOffset.UtcNow.AddDays(1)
                };

                // Set HttpOnly Cookie for the JWT token
                var atCookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTimeOffset.UtcNow.AddMinutes(double.Parse(_configuration["Jwt:TokenExpirationInMinutes"]!))
                };

                // Store tokens in cookies
                _httpContextAccessor.HttpContext!.Response.Cookies.Append("VHATfU", accessToken[0], atCookieOptions);
                _httpContextAccessor.HttpContext!.Response.Cookies.Append("VHRTDfB", refreshToken[0], rtCookieOptions);

                _logger.LogInformation("Successfully logged in as Administrator.");
                return ServiceResult<string>.SuccessResult("Logged in successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while logging in.");
                return ServiceResult<string>.FailureResult("An error occurred while logging in.");
            }
        }

        public async Task<ServiceResult<bool>> Logout()
        {
            try
            {
                var refreshToken = _httpContextAccessor.HttpContext!.Request.Cookies["VHRTDfB"]!;
                var accessToken = _httpContextAccessor.HttpContext!.Request.Cookies["VHATfU"]!;

                var deleteCookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTimeOffset.UtcNow.AddDays(-1) // Geçmiş bir tarih vererek siliyoruz
                };

                if (string.IsNullOrEmpty(refreshToken))
                {
                    _httpContextAccessor.HttpContext!.Response.Cookies.Delete("VHATfU", deleteCookieOptions);
                    _httpContextAccessor.HttpContext!.Response.Cookies.Delete("VHRTDfB", deleteCookieOptions);
                    return ServiceResult<bool>.FailureResult("The token does not exist!");
                }

                var expiryDateUnix = GetExpiryDateFromToken(accessToken);
                if (expiryDateUnix!=null)
                {
                    await _redisService.SetTokenToBlacklist(accessToken, expiryDateUnix.Value);
                }

                // Remove refresh token from Redis or any other storage
                _redisService.RemoveRefreshToken(refreshToken);
                
                // Clear the JWT and refresh token cookies
                _httpContextAccessor.HttpContext!.Response.Cookies.Delete("VHATfU", deleteCookieOptions);
                _httpContextAccessor.HttpContext!.Response.Cookies.Delete("VHRTDfB", deleteCookieOptions);

                _logger.LogInformation("Successfully logged out.");
                return ServiceResult<bool>.SuccessResult(true);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while logging out.");
                return ServiceResult<bool>.FailureResult("An error occurred while logging out.");
            }
        }

        public async Task<ServiceResult<bool>> CheckAuth()
        {
            try
            {
                var accessToken = _httpContextAccessor.HttpContext!.Request.Cookies["VHATfU"];
                var refreshToken = _httpContextAccessor.HttpContext!.Request.Cookies["VHRTDfB"];

                if (string.IsNullOrEmpty(accessToken))
                {
                    if (string.IsNullOrEmpty(refreshToken))
                    {
                        return ServiceResult<bool>.FailureResult("No authentication token provided.");
                    }

                    var refreshTokenResult = await RefreshToken(refreshToken);
                    if (refreshTokenResult.Success)
                    {
                        return ServiceResult<bool>.SuccessResult(true);
                    }
                    return ServiceResult<bool>.FailureResult("Unauthorized user.");
                }

                if (await _redisService.IsTokenBlacklistedAsync(accessToken))
                    return ServiceResult<bool>.FailureResult("Token is blacklisted.");
                
                var handler = new JwtSecurityTokenHandler();
                var jwtSettings = _configuration.GetSection("Jwt");

                handler.ValidateToken(accessToken, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings["Key"]!)),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidAudience = jwtSettings["Audience"],
                    ClockSkew = TimeSpan.Zero
                }, out _);

                return ServiceResult<bool>.SuccessResult(true);
            }
            catch (SecurityTokenException)
            {
                return ServiceResult<bool>.FailureResult("Invalid token.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while validating token.");
                return ServiceResult<bool>.FailureResult("Error during token validation.");
            }
        }

        private async Task<ServiceResult<bool>> RefreshToken(string refreshToken)
        {
            try
            {
                var userId = _redisService.GetUserIdFromRefreshToken(refreshToken);

                if (string.IsNullOrEmpty(userId))
                    return ServiceResult<bool>.FailureResult("Invalid JWT token!");

                // If refresh token is valid, generate new tokens
                var id = new ObjectId(userId);
                var filter = Builders<ApplicationUser>.Filter.Eq("_id", id);
                var user = await (await _collection.FindAsync(filter)).FirstOrDefaultAsync();

                if (user == null)
                    return ServiceResult<bool>.FailureResult("user not found!");

                var expRtJwt = DateTime.Now.AddDays(1);
                var expAtJwt = DateTime.Now.AddMinutes(15);

                var newJwtToken = GenerateJwtToken(user, expAtJwt);
                var newRefreshToken = GenerateJwtRefreshToken(user, expRtJwt);
                var refreshTokenExpiry = TimeSpan.FromDays(1);

                // Update the refresh token in Redis
                _redisService.RemoveRefreshToken(refreshToken);
                _redisService.SaveRefreshTokenToRedis(user.Id, newRefreshToken[0], refreshTokenExpiry);

                // Set new cookies
                _httpContextAccessor.HttpContext!.Response.Cookies.Append("VHATfU", newJwtToken[0], new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.UtcNow.AddMinutes(double.Parse(_configuration["Jwt:TokenExpirationInMinutes"]!))
                });

                _httpContextAccessor.HttpContext.Response.Cookies.Append("VHRTDfB", newRefreshToken[0], new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTimeOffset.Now.AddDays(1)
                });

                return ServiceResult<bool>.SuccessResult(true);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while refreshing the token.");
                return ServiceResult<bool>.FailureResult("An error occurred while refreshing the token.");
            }

        }

        private string[] GenerateJwtToken(ApplicationUser user, DateTime exiry)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings["Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.Id),
                new(ClaimTypes.Role, user.Role),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                expires: exiry,
                signingCredentials: creds,
                claims: claims                
            );

            return
            [
                new JwtSecurityTokenHandler().WriteToken(token),
                token.ValidTo.ToString(CultureInfo.InvariantCulture)
            ];
        }

        private string[] GenerateJwtRefreshToken(ApplicationUser user, DateTime exiry)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings["Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.Id),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                expires: exiry,
                signingCredentials: creds,
                claims: claims
            );

            return
            [
                new JwtSecurityTokenHandler().WriteToken(token),
                token.ValidTo.ToString(CultureInfo.InvariantCulture)
            ];
        }

        private static TimeSpan? GetExpiryDateFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

            var expClaim = jwtToken?.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Exp)?.Value;
            
            if (TimeSpan.TryParse(expClaim, out var expiryDateUnix))
                return expiryDateUnix;

            return null;
        }
    }
}
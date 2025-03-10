using System.IO.Abstractions;
using System.Text;
using Asp.Versioning;
using AspNetCoreRateLimit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using StackExchange.Redis;
using Swashbuckle.AspNetCore.SwaggerGen;
using Vehix.WebAPI.Config;
using Vehix.WebAPI.Middlewares;
using Vehix.WebAPI.Models;
using Vehix.WebAPI.Models.Enums;
using Vehix.WebAPI.Services;
using Vehix.WebAPI.Services.Interfaces;


namespace Vehix.WebAPI
{
    public abstract class Program
    {
        public static async Task Main(string[] args)
        {
            // Create a WebApplicationBuilder and configure logging
            var builder = WebApplication.CreateBuilder(args);
            ConfigureLogging(builder);
            
            try
            {
                Log.Information("Application starting up...");

                // Configure services for dependency injection
                ConfigureServices(builder);

                // Build the application
                var app = builder.Build();

                // Configure middlewares and HTTP request pipeline
                ConfigureMiddlewares(app);

                // Initialize the database with necessary data
                await InitializeDatabaseAsync(app);

                // Run the application
                await app.RunAsync();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Failed to start the application.");
            }
            finally
            {
                Log.Information("Application shutting down...");
                await Log.CloseAndFlushAsync();
            }
        }

        /// <summary>
        /// Configures Serilog logging for the application.
        /// </summary>
        /// <param name="builder">WebApplicationBuilder instance</param>
        private static void ConfigureLogging(WebApplicationBuilder builder)
        {
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(builder.Configuration)
                .Enrich.FromLogContext()
                .CreateLogger();

            builder.Logging.ClearProviders();
            builder.Logging.AddSerilog(Log.Logger);
        }

        /// <summary>
        /// Configures services and dependency injection for the application.
        /// </summary>
        /// <param name="builder">WebApplicationBuilder instance</param>
        private static void ConfigureServices(WebApplicationBuilder builder)
        {
            // Configure MongoDB settings
            builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDb"));

            // Register services for dependency injection
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<IKeyService, KeyService>();
            builder.Services.AddScoped<IVehicleService, VehicleService>();
            builder.Services.AddScoped<IFileService, FileService>();
            builder.Services.AddScoped<IEmailService, EmailService>();
            builder.Services.AddScoped<IVehicleQueryService, VehicleQueryService>();
            builder.Services.AddSingleton<IRedisService, RedisService>();
            builder.Services.AddSingleton<IFileSystem, FileSystem>();
            builder.Services.AddSingleton<IApiKeyRedisService, ApiKeyRedisService>();
            builder.Services.AddSingleton<RedisExpirationListener>();

            Log.Error(builder.Configuration.GetConnectionString("Redis")!);
            builder.Services.AddSingleton<IConnectionMultiplexer>(_ =>
            {
                var configuration = builder.Configuration.GetConnectionString("Redis")!;
                return ConnectionMultiplexer.Connect(configuration);
            });

            // Configure rate limiting
            // builder.Services.AddMemoryCache();  // Required for rate limiting
            // builder.Services.Configure<IpRateLimitOptions>(builder.Configuration.GetSection("IpRateLimiting"));
            // builder.Services.AddInMemoryRateLimiting();
            // builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();            

            // Add HttpContextAccessor for accessing HttpContext in services
            builder.Services.AddHttpContextAccessor();

            // Add health checks
            builder.Services.AddHealthChecks();

            // Configure authentication and authorization
            ConfigureAuthentication(builder);

            // Configure Swagger for API documentation
            ConfigureSwagger(builder);

            // Register controllers and enable API exploration
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();

            // Configure CORS to allow requests from specific origins
            builder.Services.AddCors(options =>
            {
                // CORS policy for Frontend with JWT
                options.AddPolicy("FrontendCors", policy => // "https://vehixapi.com", "https://api.vehixapi.com"
                {
                    policy.WithOrigins("https://vehixapi.com", "https://api.vehixapi.com") // Permitted Origins 
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();  // Allow sending cookies for JWT
                });

                // CORS policy for Public API (allowing any origin)
                options.AddPolicy("PublicApiCors", policy =>
                {
                    policy.AllowAnyOrigin()  // Open for public access
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            builder.Services.AddApiVersioning(options =>
            {
                options.DefaultApiVersion = new ApiVersion(1, 0);
                options.AssumeDefaultVersionWhenUnspecified = true;
                options.ReportApiVersions = true;
                options.ApiVersionReader = new HeaderApiVersionReader("x-api-version");
            });
        }

        /// <summary>
        /// Configures JWT-based authentication.
        /// </summary>
        /// <param name="builder">WebApplicationBuilder instance</param>
        private static void ConfigureAuthentication(WebApplicationBuilder builder)
        {
            var jwtSettings = builder.Configuration.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]!);

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtSettings["Issuer"],
                        ValidAudience = jwtSettings["Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ClockSkew = TimeSpan.Zero // Eliminate default clock skew
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            // Retrieve JWT token from HttpOnly cookie
                            var token = context.Request.Cookies["VHATfU"];
                            if (!string.IsNullOrEmpty(token))
                            {
                                context.Token = token;
                            }

                            return Task.CompletedTask;
                        }
                    };
                });
        }

        /// <summary>
        /// Configures Swagger for API documentation and JWT support.
        /// </summary>
        /// <param name="builder">WebApplicationBuilder instance</param>
        private static void ConfigureSwagger(WebApplicationBuilder builder)
        {
            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "Vehix", Version = "v1", Description = "Vehix API Version 1.0"});
                options.DocInclusionPredicate((version, apiDesc) =>
                {
                    var versions = apiDesc.CustomAttributes()
                        .OfType<ApiVersionAttribute>()
                        .SelectMany(attr => attr.Versions);

                    return versions.Any(v => $"v{v}" == version);
                });
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearerscheme.",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer"
                });
                options.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
                {
                    Description = "API Key Authorization header using the ApiKeyScheme",
                    Name = "X-API-KEY",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "ApiKeyScheme"
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new List<string>()
                    }
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "ApiKey"
                            }
                        },
                        new List<string>()
                    }
                });
            });
        }

        /// <summary>
        /// Configures the HTTP request pipeline and middlewares.
        /// </summary>
        /// <param name="app">WebApplication instance</param>
        private static void ConfigureMiddlewares(WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(options =>
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Vehix V1"));
            }
            app.UseStaticFiles();
            ConfigureFileServer(app);
            app.UseHealthChecks("/health");
            // app.UseMiddleware<RateLimitLoggingMiddleware>();
            app.UseMiddleware<ApiKeyMiddleware>();
            app.UseHttpsRedirection();
            app.UseCors("FrontendCors");
            app.UseCors("PublicApiCors");
            app.UseAuthentication();
            app.UseAuthorization();
            // app.UseIpRateLimiting();
            app.MapControllers();
            
            var listener = app.Services.GetRequiredService<RedisExpirationListener>();
            listener.StartListening();
        }

        /// <summary>
        /// Configures the file server for serving static files.
        /// </summary>
        /// <param name="app">WebApplication instance</param>
        private static void ConfigureFileServer(WebApplication app)
        {
            var webRootPath = app.Environment.WebRootPath;

            // Ensure the Images directory exists
            var imagesPath = Path.Combine(webRootPath, "Images");
            if (!Directory.Exists(imagesPath))
            {
                Directory.CreateDirectory(imagesPath);
            }

            app.UseFileServer(new FileServerOptions
            {
                FileProvider = new PhysicalFileProvider(imagesPath),
                RequestPath = "/images",
                EnableDirectoryBrowsing = false
            });
        }


        /// <summary>
        /// Initializes the database with necessary data.
        /// </summary>
        /// <param name="app">WebApplication instance</param>
        private static async Task InitializeDatabaseAsync(WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var authService = scope.ServiceProvider.GetRequiredService<IAuthService>();
            var keyService = scope.ServiceProvider.GetRequiredService<IKeyService>();

            var user = new ApplicationUser
            {
                Username = app.Configuration["Auth:Username"]!,
                Password = app.Configuration["Auth:Password"]!
            };

            var key = new Key
            {
                UserId = app.Configuration["ApiKey:Id"]!,
                ApiKey = app.Configuration["ApiKey:FrontendKey"]!,
                Username = app.Configuration["ApiKey:Username"]!,
                Email = app.Configuration["ApiKey:Email"]!,
                State = EntityState.Active,
                CreatedAt = DateTimeOffset.Now,
                ExpirationDate = DateTimeOffset.MaxValue,
                LastResponseCode = "",
                UsageCount = 0
            };

            var resultUser = await authService.CreateAdminAsync(user);
            var resultKey = await keyService.CreateFrontendApiKey(key);

            if (!resultUser.Success)
            {
                throw new Exception(resultUser.ErrorMessage);
            }

            if (!resultKey.Success)
            {
                throw new Exception(resultKey.ErrorMessage);
            }
        }
    }
}

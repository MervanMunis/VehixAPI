    using StackExchange.Redis;

    namespace Vehix.WebAPI.Middlewares
    {
        public class RateLimitLoggingMiddleware(RequestDelegate next, ILogger<RateLimitLoggingMiddleware> logger, IConnectionMultiplexer redis)
        {
            private readonly IDatabase _db = redis.GetDatabase();

            public async Task InvokeAsync(HttpContext context)
            {
                await next(context);

                // Check if the response is a 429 error
                if (context.Response.StatusCode == StatusCodes.Status429TooManyRequests)
                {
                    var ipAddress = context.Connection.RemoteIpAddress?.ToString();
                    var path = context.Request.Path;
                    logger.LogWarning("Rate limit exceeded. IP: {ipAddress}, Path: {path}", ipAddress, path);
                }

            }
        }
    }

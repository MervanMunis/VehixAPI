using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using StackExchange.Redis;
using Vehix.WebAPI.Config;
using Vehix.WebAPI.Models;

namespace Vehix.WebAPI.Middlewares
{
    public class RedisExpirationListener
    {
        private readonly IConnectionMultiplexer _redis;
        private readonly ILogger<RedisExpirationListener> _logger;
        private readonly IMongoCollection<Key> _collection;
        private readonly IDatabase _db;

        public RedisExpirationListener(IConnectionMultiplexer redis, ILogger<RedisExpirationListener> logger, IOptions<MongoDbSettings> mongoDbSettings)
        {
            var client = new MongoClient(mongoDbSettings.Value.ConnectionUri);
            var database = client.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _collection = database.GetCollection<Key>("Keys");
            _redis = redis;
            _logger = logger;
            _db = _redis.GetDatabase();
        }

        public void StartListening()
        {
            var subscriber = _redis.GetSubscriber();
            var channel = new RedisChannel("__keyevent@0__:expired", RedisChannel.PatternMode.Pattern);
            subscriber.Subscribe(channel, async (channel,key) =>
            {
                try
                {
                    const string keySelection = "ApiKeyTTL:";
                    if (!key.ToString().Contains(keySelection)) return;

                    var stringKey = key.ToString().Replace(keySelection,"ApiKey:");
                    var usageCountValue = await _db.HashGetAsync(stringKey, "UsageCount");
                    var userIdValue = await _db.HashGetAsync(stringKey, "UserId");
                    var lastResponseValue = await _db.HashGetAsync(stringKey, "LastResponse");

                    var objectId = new ObjectId(userIdValue.ToString());
                    var filter = Builders<Key>.Filter.Eq("_id", objectId);
                    var update = Builders<Key>.Update.
                        Inc(c => c.UsageCount, int.Parse(usageCountValue.ToString()))
                        .Set(c=> c.LastResponseCode, lastResponseValue.ToString());
                    await _collection.UpdateOneAsync(filter, update);
                    await _db.KeyDeleteAsync(stringKey);
                    _logger.LogInformation("API key usage data updated. Key: {key}, UserId: {userId}, UsageCountIncreased: {usageCount}", key, userIdValue, usageCountValue);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex,"Error while processing API key data from Redis. Key: {key}",key);
                }
                
            });
        }
    }
}

namespace Vehix.WebAPI.Config
{
    public class MongoDbSettings
    {
        public string ConnectionUri { get; init; } = null!;
        public string DatabaseName { get; init; } = null!;
        public string CollectionName { get; init; } = null!;
    }
}

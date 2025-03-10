namespace Vehix.WebAPI.Attributes
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false)]
    public class AuthorizeApiKeyAttribute : Attribute
    {
    }
}

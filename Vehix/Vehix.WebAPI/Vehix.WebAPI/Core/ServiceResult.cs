namespace Vehix.WebAPI.Core
{
    public class ServiceResult<T>
    {
        public bool Success { get; private init; }
        public T? Data { get; private init; }
        public string? ErrorMessage { get; private init; }

        public static ServiceResult<T> SuccessResult(T data) => new() { Success = true, Data = data };
        public static ServiceResult<T> FailureResult(string errorMessage) => new() { Success = false, ErrorMessage = errorMessage };
    }
}

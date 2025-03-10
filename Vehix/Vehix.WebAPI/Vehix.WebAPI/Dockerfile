# Use the official .NET 8 SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the project file and restore dependencies
COPY Vehix.WebAPI.csproj ./
RUN dotnet restore Vehix.WebAPI.csproj

# Copy the rest of the application files
COPY . ./
COPY ./wwwroot /app/wwwroot

# Publish the application as a self-contained release with optimization
RUN dotnet publish Vehix.WebAPI.csproj -c Release -o /out --no-restore

# Use the official .NET 8 runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Set the working directory
WORKDIR /app

# Copy the published application from the build stage
COPY --from=build /out .

# Define the entry point for the container to run the application
ENTRYPOINT ["dotnet", "Vehix.WebAPI.dll"]

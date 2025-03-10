using System.IO.Abstractions;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using Vehix.WebAPI.Services.Interfaces;

namespace Vehix.WebAPI.Services
{
    public class FileService(IFileSystem fileSystem) : IFileService
    {
        public async Task<string> SaveFileAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                throw new ArgumentException("File is invalid");
            }

            // Create the folder if it doesn't exist
            var folderPath = fileSystem.Path.Combine("wwwroot", "Images");

            if (!fileSystem.Directory.Exists(folderPath))
            {
                fileSystem.Directory.CreateDirectory(folderPath);
            }

            // Generate a unique file name
            var fileName = Guid.NewGuid() + fileSystem.Path.GetExtension(file.FileName);
            var filePath = fileSystem.Path.Combine(folderPath, fileName);

            using (var image = await Image.LoadAsync(file.OpenReadStream()))
            {
                // Resize the image
                image.Mutate(x => x.Resize(new ResizeOptions
                {
                    Mode = ResizeMode.Stretch,
                    Size = new Size(427, 320)
                }));

                await image.SaveAsync(filePath);
            }

            var relativeFilePath = fileSystem.Path.Combine("images", fileName);
            return "/" + relativeFilePath.Replace("\\", "/");
        }

        public Task<bool> DeleteFileAsync(string filePath)
        {
            if (string.IsNullOrEmpty(filePath))
            {
                return Task.FromResult(false);
            }

            // Normalize and map the path
            var relativePath = filePath.TrimStart('/').Replace("images", "Images");
            var fullPath = fileSystem.Path.Combine("wwwroot", relativePath);

            // Check if file exists
            if (!fileSystem.File.Exists(fullPath))
            {
                return Task.FromResult(false);
            }

            // Delete the file asynchronously
            return Task.Run(() =>
            {
                fileSystem.File.Delete(fullPath);
                return true;
            });
        }

    }
}
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net.Mime;
using Microsoft.Extensions.Logging;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly ILogger<FilesController> _logger;
        private readonly IWebHostEnvironment _env;

        public FilesController(ILogger<FilesController> logger, IWebHostEnvironment env)
        {
            _logger = logger;
            _env = env;
        }

        [HttpGet("{filename}")]
        public IActionResult DownloadFile(string filename)
        {
            var filePath = Path.Combine(_env.ContentRootPath, "src", "Files", filename);
            
            if (!System.IO.File.Exists(filePath))
            {
                _logger.LogWarning("File not found: {filename}", filename);
                return NotFound("File not found.");
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            var contentType = "application/pdf";

            return File(fileBytes, contentType, filename);
        }
    }
}

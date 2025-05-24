using System.Security.Claims;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly INewsPostService _newsService;

        public NewsController(INewsPostService newsPostService)
        {
            _newsService = newsPostService;
        }

        [HttpGet]
        public async Task<ActionResult<List<NewsPostDto>>> GetAllNews()
        {
            var newsPosts = await _newsService.GetAllNewsPosts();
            if (newsPosts.IsNullOrEmpty())
            {
                return BadRequest("No news sorry");
            }
            
            return Ok(newsPosts);
        }

        [HttpGet("Latest")]
        public async Task<ActionResult<List<NewsPostDto>>> GetLatestNews()
        {
            var newsPosts = await _newsService.GetLatestNews(10);
            if (newsPosts.IsNullOrEmpty())
            {
                return BadRequest("No news sorry");
            }
            return Ok(newsPosts);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<NewsPostDto>> CreateNewsPost([FromBody] CreateNewsPostDto newsPostDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier);
            if(userId == null){
                return BadRequest("User not found");
            }
            var createdNews = await _newsService.CreateNewsPostAsync(newsPostDto, Int32.Parse(userId.Value));

            return Ok(createdNews);
        }

        [HttpDelete]
        [Authorize(Roles = "Admn")]
        public async Task<ActionResult<NewsPostDto>> DeleteNewsPost(int id)
        {
            var deletedNews = await _newsService.DeleteNewsPostAsync(id);

            if (!deletedNews)
            {
                return BadRequest("No news post with that ID");
            }
            return Ok("News post with id: " + id + " deleted");
        }
    }
}
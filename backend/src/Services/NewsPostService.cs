using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services
{
    public class NewsPostService : INewsPostService
    {
        private readonly ApplicationDbContext _context;

        public NewsPostService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<NewsPostDto>> GetAllNewsPosts()
        {
            List<NewsPostDto> news = await _context.NewsPosts
                .OrderByDescending(n => n.CreatedAt)
                .Select(n => new NewsPostDto
                {
                    Id = n.Id,
                    Letter = n.Letter,
                    Creator = n.Creator,
                    CreatedAt = n.CreatedAt
                }).ToListAsync();

            return news;
        }

        public async Task<List<NewsPostDto>> GetLatestNews(int numOfLatest)
        {
            List<NewsPostDto> latestNews = await _context.NewsPosts
                .OrderByDescending(n => n.CreatedAt)
                .Take(numOfLatest)
                .Select(n => new NewsPostDto
                {
                    Id = n.Id,
                    Letter = n.Letter,
                    Creator = n.Creator,
                    CreatedAt = n.CreatedAt
                }).ToListAsync();

            return latestNews;
        }

        public async Task<bool> DeleteNewsPostAsync(int id)
        {
            var newsPost = await _context.NewsPosts.FindAsync(id);

            if (newsPost == null)
            {
                // Post not found
                return false;
            }

            _context.NewsPosts.Remove(newsPost);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<NewsPostDto> CreateNewsPostAsync(CreateNewsPostDto dto, int creatorId)
        {
            var newsPost = new NewsPost
            {
                Letter = dto.Letter,
                Creator = creatorId,

            };

            if (newsPost.Letter.IsNullOrEmpty())
            {
                throw new Exception("No content, No post");
            }

            _context.NewsPosts.Add(newsPost);
            await _context.SaveChangesAsync();

            return new NewsPostDto
            {
                Id = newsPost.Id,
                Letter = newsPost.Letter,
                Creator = newsPost.Creator
            };
        }


    }
}
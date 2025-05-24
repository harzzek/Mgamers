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
            List<NewsPost> dbNews = await _context.NewsPosts.ToListAsync();

            List<NewsPostDto> newsPosts = new List<NewsPostDto>();

            foreach (NewsPost newsItem in dbNews)
            {
                newsPosts.Add(new NewsPostDto
                {
                    Id = newsItem.Id,
                    Letter = newsItem.Letter,
                    Creator = newsItem.Creator
                });
            }

            return newsPosts;
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
                    Creator = n.Creator
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
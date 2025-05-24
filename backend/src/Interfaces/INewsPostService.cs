using backend.Models;

namespace backend.Interfaces
{
    public interface INewsPostService
    {
        Task<List<NewsPostDto>> GetAllNewsPosts();

        Task<List<NewsPostDto>> GetLatestNews(int numOfLatest);

        Task<bool> DeleteNewsPostAsync(int id);

        Task<NewsPostDto> CreateNewsPostAsync(CreateNewsPostDto dto, int creatorId);

    }
}
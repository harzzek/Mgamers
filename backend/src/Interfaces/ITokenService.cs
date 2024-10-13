
using backend.Models;

namespace backend.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(User user);
    }
}


using backend.Models;

namespace backend.Interfaces
{
    public interface IUserService
    {
        Task<List<SimpleUserDto>> GetAllUsers();
        Task<UserDto> GetUserById(int id);

        Task<User> UpdateUser(int id, UpdateUserDto dto);

        Task<User> DeleteUser(int id);
    }
}
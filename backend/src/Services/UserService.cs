using System.Globalization;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services
{
    public class UserService : IUserService
    {

        private readonly UserManager<User> _userManager;

        public UserService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<List<SimpleUserDto>> GetAllUsers()
        {
            List<User> dbusers = await _userManager.Users.ToListAsync();

            List<SimpleUserDto> users = new List<SimpleUserDto>();

            foreach (User user in dbusers)
            {
                users.Add(new SimpleUserDto
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Name = user.Name,
                    Email = user.Email,
                });
            }


            return users;
        }

        public async Task<UserDto> GetUserById(int id)
        {
            User dbuser = await _userManager.FindByIdAsync(id.ToString());

            UserDto user = new UserDto
            {
                Id = dbuser.Id,
                Username = dbuser.UserName,
                Name = dbuser.Name,
                Email = dbuser.Email,
                Birthdate = dbuser.Birthdate,
                CreatedAt = dbuser.CreatedAt.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture),
                Address = dbuser.Address,
                PhoneNumber = dbuser.PhoneNumber,
                PostNumber = dbuser.PostNumber,
                Roles = (await _userManager.GetRolesAsync(dbuser)).Select(roleName => new Role { Name = roleName }).ToList()
            };

            return user;
        }
        public async Task<User> UpdateUser(int id, UpdateUserDto dto)
        {
            User dbuser = await _userManager.FindByIdAsync(id.ToString());

            if (dbuser == null)
            {
                throw new Exception("No user found");
            }

            if (dto.Name != null && dto.Name != dbuser.Name)
            {
                dbuser.Name = dto.Name;
            }

            if (dto.Address != null && dto.Address != dbuser.Address)
            {
                dbuser.Address = dto.Address;
            }

            if (dto.PhoneNumber != null && dto.PhoneNumber != dbuser.PhoneNumber)
            {
                dbuser.PhoneNumber = dto.PhoneNumber;
            }

            if (dto.PostNumber != null && dto.PostNumber != dbuser.PostNumber)
            {
                if (!dto.PostNumber.IsNullOrEmpty())
                {
                    dbuser.PostNumber = dto.PostNumber;
                }
            }

            await _userManager.UpdateAsync(dbuser);

            return dbuser;
        }

        private static bool IsEightDigits(string number)
        {
            return number.Length == 8 && number.All(char.IsDigit);
        }

        public async Task<User> DeleteUser(int id)
        {
            User dbUser = await _userManager.FindByIdAsync(id.ToString());

            if (dbUser == null)
            {
                throw new Exception("No user with this id");
            }

            IdentityResult result = await _userManager.DeleteAsync(dbUser);

            if (!result.Succeeded)
            {
                throw new Exception("Failed to delete user");
            }

            return dbUser;
        }
    }


}
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private List<User> _users = new List<User>();

        private readonly UserManager<User> _userManager;

        private readonly ApplicationDbContext _context;

        public UserService(UserManager<User> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<List<UserDto>> GetAllUsers()
        {
            List<User> dbusers = await _userManager.Users.ToListAsync();

            List<UserDto> users = new List<UserDto>();

            foreach (User user in dbusers)
            {
                users.Add(new UserDto
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Name = user.Name,
                    Email = user.Email,
                    Birthdate = user.Birthdate,
                    Roles = (await _userManager.GetRolesAsync(user)).Select(roleName => new Role { Name = roleName }).ToList()
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
                Roles = (await _userManager.GetRolesAsync(dbuser)).Select(roleName => new Role { Name = roleName }).ToList()
            };

            return user;
        }
        public async Task<User> UpdateUser(int id, UpdateUserDto dto)
        {
            User dbuser = await _userManager.FindByIdAsync(id.ToString());

            if (dbuser == null)
            {
                return null;
            }

            if (dto.Name != null && dto.Name != dbuser.Name)
            {
                dbuser.Name = dto.Name;
            }

            if (dto.Address != null && dto.Address != dbuser.Address)
            {
                dbuser.Address = dto.Address;
            }

            string PhoneNumber = dto.PhoneNumber.ToString();

            if (PhoneNumber != null && PhoneNumber != dbuser.PhoneNumber)
            {
                if (!PhoneNumber.IsNullOrEmpty())
                {
                    if (IsEightDigits(dto.PhoneNumber.ToString()))
                    {
                        dbuser.PhoneNumber = PhoneNumber;
                    }
                    else
                    {
                        throw new Exception("Phone number not valid");
                    }

                }

            }

            string PostNumber = dto.PostNumber.ToString();

            if (PostNumber != null && PostNumber != dbuser.PostNumber)
            {
                if (!PostNumber.IsNullOrEmpty())
                {
                    dbuser.PostNumber = PostNumber;
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
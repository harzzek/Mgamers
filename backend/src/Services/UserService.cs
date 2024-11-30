using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

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

            if(dto.Name != null && dto.Name != dbuser.Name)
            {
                dbuser.Name = dto.Name;
            }

            if(dto.Birthdate != null && dto.Birthdate != dbuser.Birthdate)
            {
                dbuser.Birthdate = dto.Birthdate;
            }

            if(dto.Username != null && dto.Username != dbuser.UserName)
            {
                dbuser.UserName = dto.Username;
            }

            await _userManager.UpdateAsync(dbuser);

            return dbuser;
        }
    }


}
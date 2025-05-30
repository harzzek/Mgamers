using System.Collections.Generic;
using System.Security.Claims;
using backend.Interfaces;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IUserService _userService;

        public UserController(ApplicationDbContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<List<UserDto>>> GetAllUsers()
        {
            List<UserDto> users = await _userService.GetAllUsers();
            //var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _userService.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);

        }

        [HttpPut("{id}")]
        [Authorize (Roles = "Guest")]
        public async Task<ActionResult> UpdateUser(int id, UpdateUserDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier);

            User dbuser = await _context.Users.FindAsync(id);

            if (dbuser == null)
            {
                return NotFound();
            }
            
            if(userId == null || userId.Value != dbuser.Id.ToString()){
                return BadRequest("User not found");
            }

            try
            {
                User updatedUser = await _userService.UpdateUser(id, dto);

                return Ok(updatedUser.Name);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
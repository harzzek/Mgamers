using System.Collections.Generic;
using System.Security.Claims;
using backend.Interfaces;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IUserService _userService;

        public UserController(ApplicationDbContext context, IUserService userService, UserManager<User> userManager)
        {
            _context = context;
            _userService = userService;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize(Roles = "User,Guest")]
        public async Task<ActionResult<List<SimpleUserDto>>> GetAllUsers()
        {
            List<SimpleUserDto> users = await _userService.GetAllUsers();
            //var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "User,Guest")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            //If its his own user then it is fine.
            //If the user is not of user status. we send him away
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userRole = User.FindFirstValue(ClaimTypes.Role); // Get the user's role

            if (userId == null)
            {
                return BadRequest("User not found");
            }

            try
            {
                var user = await _userService.GetUserById(id);
                if (user == null)
                {
                    return NotFound();
                }

                // If role is Guest, ensure user is only accessing their own data
                if (userRole == "Guest" && user.Id.ToString() != userId)
                {
                    return Forbid("Guests can only access their own data.");
                }

                return Ok(user);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Guest,User")]
        public async Task<ActionResult> UpdateUser(int id, UpdateUserDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized("User ID claim not found.");
            }

            UserDto dbUser;
            try
            {
                dbUser = await _userService.GetUserById(id);
                if (dbUser == null)
                {
                    return NotFound("User not found.");
                }
            }
            catch
            {
                return StatusCode(500, "An error occurred while retrieving the user.");
            }

            // Only allow updating your own data
            if (userId != dbUser.Id.ToString())
            {
                return Forbid("You are only allowed to update your own user profile.");
            }

            try
            {
                var updatedUser = await _userService.UpdateUser(id, dto);
                return Ok(updatedUser.Name);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }

                return StatusCode(500, "A concurrency error occurred while updating the user.");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            try
            {
                User user = await _userService.DeleteUser(id);
                return Ok("User was deleted");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
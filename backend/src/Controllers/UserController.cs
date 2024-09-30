using System.Collections.Generic;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<User>> GetAllUsers()
        {
            return _userService.GetAllUsers();
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetUserById(int id)
        {
            return _userService.GetUserById(id);
        }

        [HttpPost]
        public ActionResult AddUser([FromBody] User newUser)
        {
            _userService.AddUser(newUser);
             return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateUser(int id, [FromBody] User user)
        {
            try
            {
                return Ok(_userService.UpdateUser(id, user));
            }
            catch (System.Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
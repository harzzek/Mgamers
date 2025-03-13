using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using backend.Interfaces;
using Microsoft.AspNetCore.Identity;
using backend.Models;

namespace backend.Controllers{
    
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {

        private readonly IAdminService _adminService;
        private readonly UserManager<User> _userManager;

        private readonly RoleManager<Role> _roleManager;
        public AdminController( IAdminService adminService, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _adminService = adminService;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        
        [HttpPost("UpgradeUserRole")]
        [Authorize (Roles = "Admin")]
        public async Task<IActionResult> UpgradeUserRole([FromBody] UpdateUserRoleDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            User? user = await _userManager.FindByIdAsync(dto.UserId);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            Role? role = await _roleManager.FindByNameAsync(dto.Role);

            if (role == null)
            {
                return BadRequest("Role not found");
            }

            try {
                bool result = await _adminService.UpgadeUserRole(user, role);
                if (result)
                {
                    return Ok("Role upgraded");
                }
                else
                {
                    return BadRequest("Role not upgraded");
                }
            } catch (Exception e) {
                return BadRequest(e.Message);
            }

        }

        [HttpGet("Roles")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<Role>>> GetAllRoles(){

            var roles = await _adminService.GetAllRoles();

            return Ok(roles);
        }
    }
}
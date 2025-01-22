using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Services{

    public class AdminService : IAdminService
    {
        private readonly UserManager<User> _userManager;

        private readonly RoleManager<Role> _roleManager;

        public AdminService(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<bool> UpgadeUserRole(User user, Role role)
        {
            // Check if role exists
            bool roleExists = await _roleManager.RoleExistsAsync(role.Name);

            if (!roleExists)
            {
                return false;
            }

            // Check if user is already in the role

            bool userExists = await _userManager.IsInRoleAsync(user, role.Name);

            if (userExists)
            {
                return false;
            }

            await _userManager.AddToRoleAsync(user, role.Name);

            return true;
        }

        /**
         * This method removes a role from a user
         * @param user The user to remove the role from
         * @param role The role to remove
         */
        public async Task<bool> DemoteUserRole(User user, Role role)
        {
            bool roleExists = await _userManager.IsInRoleAsync(user, role.Name);

            if (!roleExists)
            {
                return false;
            }

            await _userManager.RemoveFromRoleAsync(user, role.Name);

            return true;


        }

        public Task<bool> RemoveUser(User user)
        {
            throw new NotImplementedException();
        }


    }
}
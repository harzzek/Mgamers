using Microsoft.AspNetCore.Identity;
using backend.Models;
public static class DataSeeder
{
    public static async Task SeedRoles(RoleManager<Role> roleManager)
    {

        if (!await roleManager.RoleExistsAsync("Admin"))
        {
            await roleManager.CreateAsync(new Role(1, "Admin"));
        }

        if (!await roleManager.RoleExistsAsync("User"))
        {
            await roleManager.CreateAsync(new Role(2, "User"));
        }

        if (!await roleManager.RoleExistsAsync("Guest"))
        {
            await roleManager.CreateAsync(new Role(3, "Guest"));
        }
    }
}





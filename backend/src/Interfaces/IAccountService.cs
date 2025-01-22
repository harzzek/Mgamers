using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IAccountService
    {
        Task<IdentityResult> CreateUser(User user, string password);
        
        Task<bool> ConfirmEmail(string email, string token);

        Task<string> Login(string username, string password);

        Task<string> GeneratePasswordResetToken(string email);
        
        Task<bool> ResetPassword(ResetPasswordDto model);

    }
}
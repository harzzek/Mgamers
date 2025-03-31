using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;

        public AccountService(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        public async Task<bool> ConfirmEmail(string email, string token)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return false;
            }

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /** 
        * This method returns a token if the user is found by email
        */
        public async Task<string> GeneratePasswordResetToken(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                // Do not reveal that the user does not exist or is not confirmed
                throw new Exception("User not found");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            Console.WriteLine("token: " + token);

            return token;
    
        }

        /**
        * This method returns a token if the login is successful
        */
        public async Task<string> Login(string username, string password)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                throw new Exception("Invalid login attempt");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);

            if(result.Succeeded)
            {
                var token = await _tokenService.CreateToken(user);
                return token;
            }
            else
            {
                throw new Exception("Invalid login attempt");
            }
        }

        public async Task<IdentityResult> CreateUser(User user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);

            return result;
        }

        public async Task<IdentityResult> RemoveUser(User user)
        {
            var result = await _userManager.DeleteAsync(user);

            return result;
        }

        public async Task<bool> ResetPassword(ResetPasswordDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // Do not reveal that the user does not exist
                return false;
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);

            if (result.Succeeded)
            {
                return true;
            }
            return false;
        }
    }
}
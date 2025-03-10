using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        private readonly IEmailSender _emailSender;

        private readonly IAccountService _accountService;

        private readonly IUserService _userService;

        public AccountController(UserManager<User> userManager, IEmailSender emailSender, IAccountService accountService, IUserService userService)
        {
            _userManager = userManager;
            _emailSender = emailSender;
            _accountService = accountService;
            _userService = userService;
        }

        // POST: api/Account/Register
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new User
            {
                Name = model.Name,
                UserName = model.Username,
                Email = model.Email,
                Birthdate = model.Birthdate
            };

            var result = await _accountService.CreateUser(user, model.Password);

            if (result.Succeeded)
            {
                //Generate email confirmation token
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                Console.WriteLine("token: " + token);

                //Build the confirmation link
                var confirmationLink = Url.Action(nameof(ConfirmEmail), "Account", new { token }, Request.Scheme);

                await _emailSender.SendEmailAsync(user.Email, "Confirm your email", $"Please confirm your account by clicking this link: {confirmationLink}");

                // Add user to the default role
                var role = await _userManager.AddToRoleAsync(user, "Guest");
                if (role.Succeeded)
                {
                    return Ok(new { message = "User created successfully:" });
                }

            }
            return BadRequest(result.Errors);
        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return BadRequest("Invalid email address.");
            }

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return Ok("Email confirmed successfully.");
            }
            else
            {
                return BadRequest("Email confirmation failed.");
            }
        }

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto model)
        {

            var user = await _userManager.FindByEmailAsync(model.Email);

            try
            {
                var token = await _accountService.GeneratePasswordResetToken(model.Email);

                var resetLink = Url.Action(
                nameof(ResetPassword),
                "Account",
                new { token, email = user.Email },
                Request.Scheme);

                await _emailSender.SendEmailAsync(
                user.Email,
                "Reset Password",
                $"Please reset your password by clicking this link: {resetLink}");

            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Invalid request." });
            }

            return Ok(new { message = "If the email is associated with an account, a password reset link has been sent." });
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto model)
        {
            try
            {
                await _accountService.ResetPassword(model);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok(new { message = "Password reset successful." });
        }

        // POST: api/Account/Login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User? user = await _userManager.FindByNameAsync(model.Username);

            if (user == null)
            {
                return BadRequest(new { message = "Invalid login attempt" });
            }
            else
            {
                try
                {
                    var token = await _accountService.Login(model.Username, model.Password);
                    IList<string> userRoles = await _userManager.GetRolesAsync(user);
                    return Ok(new { message = "Login successful", token, user = new {  user.Id, user.UserName, userRoles} });
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    return BadRequest(new { message = "Invalid login attempt" });
                }
            }
        }

        // POST: api/Account/Logout
        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            return Ok(new { message = "Logout successful" });
        }

        [HttpGet("UserTokenValidation")]
        public async Task<IActionResult> UserTokenValidation()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return BadRequest(new { message = "Invalid or missing token" });
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return BadRequest(new { message = "User not found" });
            }

            return Ok(new
            {
                message = "Token is valid",
            });
        }



    }
}

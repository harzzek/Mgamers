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

        private readonly SignInManager<User> _signInManager;

        private readonly ITokenService _tokenService;

        private readonly ApplicationDbContext _context;

        private readonly IEmailSender _emailSender;

        public AccountController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager, ApplicationDbContext context, IEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _context = context;
            _emailSender = emailSender;
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

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                //Generate email confirmation token
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

                //Build the confirmation link
                var confirmationLink = Url.Action(nameof(ConfirmEmail), "Account", new { token, email = user.Email }, Request.Scheme);

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
        // AccountController.cs

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
            if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
            {
                // Do not reveal that the user does not exist or is not confirmed
                return Ok(new { message = "If the email is associated with an account, a password reset link has been sent." });
            }

            // Generate password reset token
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            // Build the password reset link
            var resetLink = Url.Action(
                nameof(ResetPassword),
                "Account",
                new { token, email = user.Email },
                Request.Scheme);

            // Send the email
            await _emailSender.SendEmailAsync(
                user.Email,
                "Reset Password",
                $"Please reset your password by clicking this link: {resetLink}");

            return Ok(new { message = "If the email is associated with an account, a password reset link has been sent." });
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // Do not reveal that the user does not exist
                return BadRequest(new { message = "Invalid request." });
            }

            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);
            if (result.Succeeded)
            {
                return Ok(new { message = "Password has been reset successfully." });
            }

            return BadRequest(result.Errors);
        }

        // POST: api/Account/Login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByNameAsync(model.Username);

            if (user == null)
                return BadRequest(new { message = "Invalid username or password" });

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

            if (!result.Succeeded)
                return BadRequest(new { message = "Invalid username or password" });

            var token = await _tokenService.CreateToken(user);

            var returnObject = new
            {
                usertoken = token,
                expiration = "7 days"
            };

            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new { message = "Login successful", returnObject, user = new { user.Id, user.UserName, user.Email, roles } });
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

            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new
            {
                message = "Token is valid",
                user = new { user.Id, user.UserName, user.Email, roles = roles }
            });
        }



    }
}

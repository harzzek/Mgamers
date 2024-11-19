using System.Security.Claims;
using backend.DTO;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrationController : ControllerBase{
        private readonly ApplicationDbContext _context;
        private readonly IRegistrationService _registrationService;
        
        public RegistrationController(ApplicationDbContext context, IRegistrationService registrationService){
            _context = context;
            _registrationService = registrationService;
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<Event>> RegisterForEvent([FromBody] RegisterForEventDto dto){
            var userId = User.FindFirst(ClaimTypes.NameIdentifier);
            
            if(userId == null || userId.Value != dto.UserId.ToString()){
                return BadRequest("User not found");
            }

            if(dto.EventId == null || dto.SeatIds == null){
                return BadRequest("Event or seat not found");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == dto.UserId);

            var eventItem = await _context.Events.FirstOrDefaultAsync(e => e.Id == dto.EventId);

            var seats = await _context.Seats.Where(s => dto.SeatIds.Contains(s.Id)).ToListAsync();

            if(seats.Count != dto.SeatIds.Count || seats.Count == 0 || seats.Count > 2){
                return BadRequest("Too many seats or no seats found");
            }

            if(user == null || eventItem == null || seats == null){
                return NotFound();
            }

            var isCreated = await _registrationService.CreateRegistration(dto);

            if(isCreated == null){
                return BadRequest("Registration failed, make sure you have marked two adjacent seats. (If you choose two).");
            }

            return Ok("User assigned to event: " + eventItem);
        }

        [HttpPost("admin")]
        [Authorize (Roles = "Admin")]
        public async Task <ActionResult<Event>> AdminExtendSeat([FromBody] RegisterForEventDto dto){
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == dto.UserId);

            var eventItem = await _context.Events.FirstOrDefaultAsync(e => e.Id == dto.EventId);

            var seats = await _context.Seats.Where(s => dto.SeatIds.Contains(s.Id)).ToListAsync();

            if(seats.Count != dto.SeatIds.Count || seats.Count == 0 || seats.Count > 2){
                return BadRequest("Too many seats or no seats found");
            }

            if(user == null || eventItem == null || seats == null){
                return NotFound();
            }

            var isCreated = await _registrationService.CreateRegistration(dto);

            if(isCreated == null){
                return BadRequest("Registration failed");
            }

            return Ok("User assigned to event: " + isCreated);
            
        }

        [HttpGet("{id}")]
        [Authorize (Roles = "User")]
        public async Task<ActionResult<List<Registration>>> GetRegistrationsForEvent(int id){
            var eventItem = await _context.Events
                .Include(x => x.Registrations)
                .FirstOrDefaultAsync(x => x.Id == id);

            if(eventItem == null){
                return NotFound();
            }

            var registrations = await _registrationService.GetRegistrationsForEvent(eventItem);

            return Ok(registrations);
        }

        
        [HttpDelete]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<Event>> deleteRegistration([FromBody] DeleteRegForEventDto dto){
            var userId = User.FindFirst(ClaimTypes.NameIdentifier);
            
            if(userId == null || userId.Value != dto.UserId.ToString()){
                return BadRequest("User not found");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == dto.UserId);

            var eventItem = await _context.Events.FirstOrDefaultAsync(e => e.Id == dto.EventId);

            if(user == null || eventItem == null){
                Console.WriteLine("User or event not found");
                return NotFound();
            }

            var response = await _registrationService.DeleteRegistration(dto);

            if(response == null){
                return NotFound();
            }

            return Ok("User removed from event: " + eventItem);
        }
    }
}
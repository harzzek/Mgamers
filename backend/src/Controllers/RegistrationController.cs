using backend.DTO;
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

        public RegistrationController(ApplicationDbContext context){
            _context = context;
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<Event>> RegisterForEvent([FromBody] RegisterForEventDto dto){
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == dto.UserId);
            var eventItem = await _context.Events.FirstOrDefaultAsync(e => e.Id == dto.EventId);

            if(user == null || eventItem == null){
                return NotFound();
            }

            eventItem.Registrations.Add(user);
            user.RegistratedEvents.Add(eventItem);

            await _context.SaveChangesAsync();

            return Ok("User assigned to event: " + eventItem);
        }

        [HttpDelete]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<Event>> UnregisterFromEvent([FromBody] RegisterForEventDto dto){
            var user = await _context.Users
            .Include(u => u.RegistratedEvents)
            .FirstOrDefaultAsync(u => u.Id == dto.UserId);
            var eventItem = await _context.Events
            .Include(e => e.Registrations)
            .FirstOrDefaultAsync(e => e.Id == dto.EventId);

            if(user == null || eventItem == null){
                return NotFound();
            }

            if(!eventItem.Registrations.Contains(user)){
                return BadRequest("User is not registered for this event");
            }

            eventItem.Registrations.Remove(user);
            user.RegistratedEvents.Remove(eventItem);

            await _context.SaveChangesAsync();

            return Ok("User unassigned from event: " + eventItem);
        }
    }
}
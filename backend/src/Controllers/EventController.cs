using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EventController(ApplicationDbContext context){
            _context = context;
        }

        [HttpGet]
        [Authorize (Roles = "Guest")]
        public async Task<ActionResult<List<Event>>> GetAllEvents(){
            var events = await _context.Events.ToListAsync();
            return Ok(events);
        }

        [HttpGet("{id}")]
        [Authorize (Roles = "Guest")]
        public async Task<ActionResult<Event>> GetEventById(int id){
            var eventItem = await _context.Events.FirstOrDefaultAsync(e => e.Id == id);

            if(eventItem == null){
                return NotFound();
            }

            return Ok(eventItem);
        }

        [HttpPost]
        [Authorize (Roles = "Admin")]
        public async Task<ActionResult<Event>> CreateEvent([FromBody] CreateEventDto eventItem){
            var newEvent = new Event{
                Name = eventItem.Name,
                Description = eventItem.Description,
                Location = eventItem.Location,
                StartDate = eventItem.StartDate,
                StartTime = eventItem.StartTime,
                EndDate = eventItem.EndDate,
                EndTime = eventItem.EndTime
            };

            await _context.Events.AddAsync(newEvent);
            await _context.SaveChangesAsync();

            return Ok(newEvent);
        }


    }
}

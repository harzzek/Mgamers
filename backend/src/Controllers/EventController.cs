using System.Globalization;
using backend.Interfaces;
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

        private readonly IEventService _eventService;

        public EventController(ApplicationDbContext context, IEventService eventService){
            _context = context;
            _eventService = eventService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Event>>> GetAllEvents(){
            var events = await _context.Events.ToListAsync();
            return Ok(events);
        }

        [HttpGet("{id}")]
        [Authorize (Roles = "User")]
        public async Task<ActionResult<EventDetailsDTO>> GetEventById(int id){

            EventDetailsDTO eventItem = await _eventService.GetEventById(id);

            return Ok(eventItem);
        }

        [HttpPost]
        [Authorize (Roles = "Admin")]
        public async Task<ActionResult<Event>> CreateEvent([FromBody] CreateEventDto eventItem){            

            if(!DateTime.TryParseExact(eventItem.StartDate, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime startDate)){
                return BadRequest("Start dato er ikke valid");
            }

            if(!DateTime.TryParseExact(eventItem.EndDate, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime endDate)){
                return BadRequest("Slut dato er ikke valid");
            }

            if (startDate > endDate){
                return BadRequest("Startdato må ikke være efter slutdato.");
            }

            if (!TimeSpan.TryParseExact(eventItem.StartTime, "hh\\:mm", CultureInfo.InvariantCulture, out TimeSpan startTime)){
                return BadRequest("Start tid ikke gyldig");
            }

            if (!TimeSpan.TryParseExact(eventItem.EndTime, "hh\\:mm", CultureInfo.InvariantCulture, out TimeSpan endTime)){
                return BadRequest("Slut tid ikke gyldig");
            }

            if (startDate == endDate){
                if(startTime > endTime){
                    return BadRequest("Tider er ikke gyldig for samme dato");
                }
            }

            Event createdEvent = await _eventService.CreateEvent(eventItem);

            return Ok(createdEvent);
        }


    }
}

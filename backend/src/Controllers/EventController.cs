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
            var events = await _eventService.GetAllEvents();
            return Ok(events);
        }

        [HttpGet("Upcoming")]
        public async Task<ActionResult<List<Event>>> GetUpcomingEvents(){
            var events = await _eventService.GetUpcomingEvents();
            return Ok(events);
        }

        [HttpGet("NextEvent")]
        public async Task<ActionResult<Event>> GetNextEvent(){
            var eventItem = await _eventService.GetNextEvent();
            return Ok(eventItem);
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

            try {
                Event createdEvent = await _eventService.CreateEvent(eventItem);
                return Ok(createdEvent);
            } catch (Exception e) {
                return BadRequest(e.Message);
            }

        }


    }
}

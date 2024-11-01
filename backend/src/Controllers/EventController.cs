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
            var eventItem = await _context.Events
                .Include(x => x.Registrations)
                .FirstOrDefaultAsync(x => x.Id == id);

            EventDetailsDTO sEventItem = await _eventService.GetEventById(eventItem);

            if(eventItem == null){
                return NotFound();
            }

            return Ok(sEventItem);
        }

        [HttpPost]
        [Authorize (Roles = "Admin")]
        public async Task<ActionResult<Event>> CreateEvent([FromBody] CreateEventDto eventItem){

            List<Table> tables = new List<Table>();
            List<Seat> seats = new List<Seat>();

            var newEvent = new Event{
                Name = eventItem.Name,
                Description = eventItem.Description,
                Location = eventItem.Location,
                StartDate = eventItem.StartDate,
                StartTime = eventItem.StartTime,
                EndDate = eventItem.EndDate,
                EndTime = eventItem.EndTime,
            };

            for(int i = 0; i < eventItem.TableAmount; i++){
                var newTable = new Table{
                    Event = newEvent,
                };

                tables.Add(newTable);
            }

            foreach(Table table in tables){
                for(int i = 0; i < 2; i++){
                    var newSeat = new Seat{
                        Table = table,
                    };
                    seats.Add(newSeat);
                }
            }

            await _context.Tables.AddRangeAsync(tables);
            await _context.Seats.AddRangeAsync(seats);
            await _context.Events.AddAsync(newEvent);
            await _context.SaveChangesAsync();

            return Ok(newEvent);
        }


    }
}

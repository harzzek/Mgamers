using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class EventService : IEventService
    {

        private readonly ApplicationDbContext _context;

        public EventService( ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<EventDto>> GetAllEvents()
        {
            List <Event> dbEvents = await _context.Events.ToListAsync();

            List<EventDto> events = new List<EventDto>();

            foreach (Event eventItem in dbEvents)
            {
                events.Add(new EventDto
                {
                    Id = eventItem.Id,
                    Name = eventItem.Name,
                    Description = eventItem.Description,
                    Location = eventItem.Location,
                    StartDate = eventItem.StartDate,
                    StartTime = eventItem.StartTime,
                    EndDate = eventItem.EndDate,
                    EndTime = eventItem.EndTime
                });
            }

            return events;
        }

        public async Task<EventDetailsDTO> GetEventById(Event eventItem)
        {

            EventDetailsDTO dtoEvent = new EventDetailsDTO
            {
                Id = eventItem.Id,
                Name = eventItem.Name,
                Description = eventItem.Description,
                Location = eventItem.Location,
                StartDate = eventItem.StartDate,
                StartTime = eventItem.StartTime,
                EndDate = eventItem.EndDate,
                EndTime = eventItem.EndTime,
                Participants = eventItem.Registrations
            };

            return dtoEvent;
        }

        public async Task<Event> CreateEvent(CreateEventDto eventItem)
        {
            Event newEvent = new Event{
                Name = eventItem.Name,
                Description = eventItem.Description,
                Location = eventItem.Location,
                StartDate = eventItem.StartDate,
                StartTime = eventItem.StartTime,
                EndDate = eventItem.EndDate,
                EndTime = eventItem.EndTime
            };

            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();
            return newEvent;
        }
    }
}
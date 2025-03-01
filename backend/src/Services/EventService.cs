using System.Globalization;
using backend.DTO;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class EventService : IEventService
    {

        private readonly ApplicationDbContext _context;

        public EventService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<EventDto>> GetAllEvents()
        {
            List<Event> dbEvents = await _context.Events.ToListAsync();

            List<EventDto> events = new List<EventDto>();

            foreach (Event eventItem in dbEvents)
            {
                events.Add(new EventDto
                {
                    Id = eventItem.Id,
                    Name = eventItem.Name,
                    Description = eventItem.Description,
                    Location = eventItem.Location,
                    StartDate = DateTime.ParseExact(eventItem.StartDate.ToString(), "dd-MM-yyyy", CultureInfo.InvariantCulture).ToString(),
                    StartTime = eventItem.StartTime.ToString(),
                    EndDate = DateTime.ParseExact(eventItem.EndDate.ToString(), "dd-MM-yyyy", CultureInfo.InvariantCulture).ToString(),
                    EndTime = eventItem.EndTime.ToString()
                });
            }

            return events;
        }

        public async Task<EventDetailsDTO> GetEventById(int eventId)
        {
            var eventItem = await _context.Events
                .Where(e => e.Id == eventId)
                .Select(e => new EventDetailsDTO
                {
                    Id = e.Id,
                    Name = e.Name,
                    Description = e.Description,
                    Location = e.Location,
                    StartDate = e.StartDate.ToString(),
                    StartTime = e.StartTime.ToString(),
                    EndDate = e.EndDate.ToString(),
                    EndTime = e.EndTime.ToString(),
                    Participants = e.Registrations.Select(r => new RegistrationDto
                    {
                        UserId = r.UserId,
                        EventId = r.EventId,
                        SeatId = r.SeatId,
                        User = new SimpleUserDto
                        {
                            Id = r.User.Id,
                            Username = r.User.UserName,
                        }
                    }).ToList(),
                    Tables = e.Tables.Select(t => new TableDto
                    {
                        Id = t.Id,
                        EventId = t.EventId,
                        Seats = t.Seats.Select(s => new Seat
                        {
                            Id = s.Id,
                            TableId = s.TableId,
                        }).ToList()
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            return eventItem;
        }

        public async Task<Event> CreateEvent(CreateEventDto eventItem)
        {
            List<Table> tables = new List<Table>();
            List<Seat> seats = new List<Seat>();

            if(!DateTime.TryParseExact(eventItem.StartDate, "dd-MM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime startDate)){
                throw new Exception("Invalid start date");
            }

            if(!DateTime.TryParseExact(eventItem.EndDate, "dd-MM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime endDate)){
                throw new Exception("Invalid end date");
            }

            if (startDate > endDate){
                throw new Exception("Start date cannot be after end date");
            }

            if (!TimeSpan.TryParseExact(eventItem.StartTime, "hh\\:mm", CultureInfo.InvariantCulture, out TimeSpan startTime)){
                throw new Exception("Invalid start time");
            }

            if (!TimeSpan.TryParseExact(eventItem.EndTime, "hh\\:mm", CultureInfo.InvariantCulture, out TimeSpan endTime)){
                throw new Exception("Invalid end time");
            }

            if (startDate == endDate){
                if(startTime > endTime){
                    throw new Exception("Start time cannot be after end time");
                }
            }

            var newEvent = new Event{
                Name = eventItem.Name,
                Description = eventItem.Description,
                Location = eventItem.Location,
                StartDate = DateTime.Parse(eventItem.StartDate),
                StartTime = TimeOnly.Parse(eventItem.StartTime),
                EndDate = DateTime.Parse(eventItem.EndDate),
                EndTime = TimeOnly.Parse(eventItem.EndTime),
            };

            for(int i = 0; i < eventItem.TableAmount; i++){
                var newTable = new Table{
                    Event = newEvent,
                };

                tables.Add(newTable);
            }

            if(eventItem.TableAmount > 0){
                foreach (Table table in tables)
                {
                    for (int i = 0; i < 2; i++)
                    {
                        var newSeat = new Seat
                        {
                            Table = table,
                        };
                        seats.Add(newSeat);
                    }
                }
                await _context.Tables.AddRangeAsync(tables);
                await _context.Seats.AddRangeAsync(seats);
            }

            await _context.Events.AddAsync(newEvent);
            await _context.SaveChangesAsync();

            return newEvent;
        }
    }
}
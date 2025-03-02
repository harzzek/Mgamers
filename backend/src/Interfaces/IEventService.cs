using backend.Models;

namespace backend.Interfaces
{
    public interface IEventService
    {

        Task<List<EventDto>> GetAllEvents();

        Task<List<EventDto>> GetUpcomingEvents();

        Task<EventDto> GetNextEvent();

        Task<EventDetailsDTO> GetEventById(int eventId);

        Task<Event> CreateEvent(CreateEventDto dto);
        
    }
}
using backend.Models;

namespace backend.Interfaces
{
    public interface IEventService
    {

        Task<List<EventDto>> GetAllEvents();

        Task<EventDetailsDTO> GetEventById(int eventId);

        Task<Event> CreateEvent(CreateEventDto eventDto);
        
    }
}
using backend.DTO;
using backend.Models;

namespace backend.Interfaces
{
    public interface IRegistrationService
    {

        Task<List<Registration>> GetAllRegistrations();

        Task<List<Registration>> GetRegistrationsForEvent(Event eventItem);

        Task<List<Registration>> CreateRegistration(RegisterForEventDto registrationItem);

        Task<DeleteRegForEventDto> DeleteRegistration(DeleteRegForEventDto registration);
        
    }
}
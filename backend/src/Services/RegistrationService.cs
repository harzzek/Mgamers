using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using backend.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;


namespace backend.Services
{
    public class RegistrationService : IRegistrationService
    {

        private readonly ApplicationDbContext _context;

        public RegistrationService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<Registration>> CreateRegistration(RegisterForEventDto registrationItem)
        {

            List<Registration> registrations = new List<Registration>();

            bool seatsAvailable = await ValidateSeatAvailability(registrationItem);

            if (!seatsAvailable)
            {
                return null;
            }

            if(registrationItem.SeatIds.Count > 1)
            {
                Registration registration = new Registration
                {
                    EventId = registrationItem.EventId,
                    UserId = registrationItem.UserId,
                    SeatId = registrationItem.SeatIds[0]
                };

                registrations.Add(registration);

                Registration registration2 = new Registration
                {
                    EventId = registrationItem.EventId,
                    UserId = registrationItem.UserId,
                    SeatId = registrationItem.SeatIds[1]
                };

                registrations.Add(registration2);
            } else {
                Registration registration = new Registration
                {
                    EventId = registrationItem.EventId,
                    UserId = registrationItem.UserId,
                    SeatId = registrationItem.SeatIds[0]
                };

                registrations.Add(registration);

            }

            foreach (Registration registration in registrations)
            {
                _context.Registrations.Add(registration);
            }
            await _context.SaveChangesAsync();

            return registrations;
        }

        public async Task<DeleteRegForEventDto> DeleteRegistration(DeleteRegForEventDto registration)
        {

            var registrationsToDelete = await _context.Registrations
                .Where(r => r.UserId == registration.UserId && r.EventId == registration.EventId)
                .ToListAsync();

            if (registrationsToDelete.Count == 0)
            {
                Console.WriteLine("No registrations found");
                return null;
            }

            foreach (Registration registrationToDelete in registrationsToDelete)
            {
                _context.Registrations.Remove(registrationToDelete);
            }
            await _context.SaveChangesAsync();

            return registration;            
        }

        public async Task<List<Registration>> GetAllRegistrations()
        {
            List<Registration> registrations = await _context.Registrations.ToListAsync();

            return registrations;
        }

        public async Task<List<Registration>> GetRegistrationsForEvent(Event eventItem)
        {
            List<Registration> registrations = await _context.Registrations
                .Where(x => x.Event == eventItem)
                .ToListAsync();

            return registrations;
        }

        /**
        * Check if the seats are available for registration
        * 
        * If seats are already registered, return false
        * If seats are not on the same table, return false
        * If User already has a registration for the event at another table, return false
        * If only contains one seat, and its already registered, return false
        */
        public async Task<bool> ValidateSeatAvailability(RegisterForEventDto registrationItem)
        {

            var eventItem = await _context.Events.FirstOrDefaultAsync(e => e.Id == registrationItem.EventId);  
            eventItem.Registrations = await _context.Registrations.Where(r => r.EventId == eventItem.Id).ToListAsync();

            var registrations = eventItem.Registrations;
            var seats = await _context.Seats.Where(s => registrationItem.SeatIds.Contains(s.Id)).ToListAsync();

            //Check if the seats are at the same table
            if( seats.Count > 1){
                if (seats[0].TableId != seats[1].TableId)
                {
                    return false;
                }
            }
            
            //Check if the user already has a registration for the event
            foreach (Registration registration in registrations)
            {
                if (registration.UserId == registrationItem.UserId)
                {
                    return false;
                }
            }

            //Check if there already is a registration for the seats
            foreach (Registration registration in registrations)
            {
                foreach (Seat seat in seats)
                {
                    if (registration.SeatId == seat.Id)
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
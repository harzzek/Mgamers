using Xunit;
using backend.Services;
using backend.Models;
using Microsoft.EntityFrameworkCore;
namespace backend.test;

public class registrationServiceTest{

    private ApplicationDbContext GetMockDbContext(string dbname)
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: dbname)
            .Options;

        var context = new ApplicationDbContext(options);

        return context;
    }

    [Fact]
    public async Task CreateRegistration_ReturnsEventWithParticipant()
    {
        // Arrange
        var context = GetMockDbContext("CreateRegistration");
        context.Users.AddRange(
            new User { Id = 1, Name = "User 1", Email = "someemail@gmail.com", Birthdate = "1990-01-01", UserName = "user1"}
        );
        context.SaveChanges();
        var registrationService = new RegistrationService(context);
        var eventService = new EventService(context);

        await eventService.CreateEvent(new CreateEventDto
        {
            Name = "Event 1",
            Description = "Description 1",
            Location = "Location 1",
            StartDate = "2021-01-01",
            StartTime = "12:00",
            EndDate = "2021-01-01",
            EndTime = "13:00",
            TableAmount = 5
        });
        var registration = new DTO.RegisterForEventDto
        {
            UserId = 1,
            EventId = 1,
            SeatIds = [1]
        };

        // Act
        var result = await registrationService.CreateRegistration(registration);

        // Assert
        Assert.Equal(1, result[0].UserId);
        Assert.Equal(1, result[0].EventId);
        Assert.Equal(1, result[0].SeatId);

        var eventItem = await eventService.GetEventById(1);

        Assert.Equal(1, eventItem.Participants[0].UserId);
        Assert.NotEqual(2, eventItem.Participants[0].UserId);
    }

    
}
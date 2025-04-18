using Xunit;
using backend.Services;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.test;

public class EventServiceTest
{
    private ApplicationDbContext GetMockDbContext(string dbname)
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: dbname)
            .Options;

        var context = new ApplicationDbContext(options);

        return context;
    }

    [Fact]
    public void Test1()
    {
        Assert.True(true);
    }

    /*
    [Fact]
    public async Task GetAllEvents_ReturnsAllEvents()
    {
        // Arrange
        var context = GetMockDbContext("GetAllEvents_ReturnsAllEvents");
        context.Events.AddRange(
            new Event { Id = 1, Name = "Event 1", Description = "Description 1", Location = "Location 1", StartDate = "2021-01-01", StartTime = "12:00", EndDate = "2021-01-01", EndTime = "13:00" },
            new Event { Id = 2, Name = "Event 2", Description = "Description 2", Location = "Location 2", StartDate = "2021-01-02", StartTime = "12:00", EndDate = "2021-01-02", EndTime = "13:00" }
        );
        context.SaveChanges();
        var eventService = new EventService(context);

        // Act
        var result = await eventService.GetAllEvents();

        // Assert
        Assert.Equal(2, result.Count);
        Assert.Equal("Event 1", result[0].Name);
        Assert.Equal("Event 2", result[1].Name);
    }

    [Fact]
    public async Task GetEventById_ReturnsEvent()
    {
        // Arrange;
        var context = GetMockDbContext("GetEventById_ReturnsEvent");
        context.Events.AddRange(
            new Event { Id = 1, Name = "Event 1", Description = "Description 1", Location = "Location 1", StartDate = "2021-01-01", StartTime = "12:00", EndDate = "2021-01-01", EndTime = "13:00" },
            new Event { Id = 2, Name = "Event 2", Description = "Description 2", Location = "Location 2", StartDate = "2021-01-02", StartTime = "12:00", EndDate = "2021-01-02", EndTime = "13:00" }
        );
        context.SaveChanges();
        var eventService = new EventService(context);

        // Act
        var result = await eventService.GetEventById(1);

        // Assert
        Assert.Equal("Event 1", result.Name);
    }

    [Fact]
    public async Task GetEventById_ReturnsNull()
    {
        // Arrange;
        var context = GetMockDbContext("GetEventById_ReturnsNull");
        context.Events.AddRange(
            new Event { Id = 1, Name = "Event 1", Description = "Description 1", Location = "Location 1", StartDate = "2021-01-01", StartTime = "12:00", EndDate = "2021-01-01", EndTime = "13:00" },
            new Event { Id = 2, Name = "Event 2", Description = "Description 2", Location = "Location 2", StartDate = "2021-01-02", StartTime = "12:00", EndDate = "2021-01-02", EndTime = "13:00" }
        );
        context.SaveChanges();
        var eventService = new EventService(context);

        // Act
        var result = await eventService.GetEventById(3);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task CreateEvent_ReturnsEvent()
    {
        // Arrange
        var context = GetMockDbContext("CreateEvent_ReturnsEvent");
        context.Events.AddRange(
            new Event { Id = 1, Name = "Event 1", Description = "Description 1", Location = "Location 1", StartDate = "2021-01-01", StartTime = "12:00", EndDate = "2021-01-01", EndTime = "13:00" },
            new Event { Id = 2, Name = "Event 2", Description = "Description 2", Location = "Location 2", StartDate = "2021-01-02", StartTime = "12:00", EndDate = "2021-01-02", EndTime = "13:00" }
        );
        context.SaveChanges();
        var eventService = new EventService(context);
        var newEvent = new CreateEventDto
        {
            Name = "Event 3",
            Description = "Description 3",
            Location = "Location 3",
            StartDate = "2021-01-03",
            StartTime = "12:00",
            EndDate = "2021-01-03",
            EndTime = "13:00",
            TableAmount = 3
        };

        // Act
        var result = await eventService.CreateEvent(newEvent);

        // Assert
        Assert.Equal("Event 3", result.Name);

        var createdEvent = await eventService.GetEventById(result.Id);
        Assert.Equal("Event 3", createdEvent.Name);
    }
    */

    [Fact]
    public async Task CreateEventWithZeroTables_ReturnsEvent(){

        var context = GetMockDbContext("CreateEventWithZeroTables");
        
        var eventService = new EventService(context);
        var newEvent = new CreateEventDto
        {
            Name = "NoTablesEvent",
            Description = "Description 3",
            Location = "Location 3",
            StartDate = "2021-01-03",
            StartTime = "12:00",
            EndDate = "2021-01-03",
            EndTime = "13:00",
            TableAmount = 0
        };

    
        var result = await eventService.CreateEvent(newEvent);
        Assert.Equal("NoTablesEvent", result.Name);
        

        var createdEvent = await eventService.GetEventById(result.Id);
        Assert.Equal("NoTablesEvent", createdEvent.Name);
    }

    [Fact]
    public async Task CreateEventWithNegativeTables_ReturnsEventWithZeroTables(){

        var context = GetMockDbContext("CreateEventWithNegativeTables");
        
        var eventService = new EventService(context);
        var newEvent = new CreateEventDto
        {
            Name = "NegativeTablesEvent",
            Description = "Description 3",
            Location = "Location 3",
            StartDate = "2021-01-03",
            StartTime = "12:00",
            EndDate = "2021-01-03",
            EndTime = "13:00",
            TableAmount = -1
        };

        var result = await eventService.CreateEvent(newEvent);

        Assert.Equal("NegativeTablesEvent", result.Name);

        var createdEvent = await eventService.GetEventById(result.Id);
        Assert.Empty(createdEvent.Tables);
    }

    [Fact]
    public async Task CreateEventWithInverseDates_ReturnsError(){

        var context = GetMockDbContext("CreateEventWithInverseDates");
        
        var eventService = new EventService(context);
        var newEvent = new CreateEventDto
        {
            Name = "InverseDatesEvent",
            Description = "Description 3",
            Location = "Location 3",
            StartDate = "2021-01-03",
            StartTime = "12:00",
            EndDate = "2021-01-02",
            EndTime = "13:00",
            TableAmount = 1
        };

        try{
            var result = await eventService.CreateEvent(newEvent);
        } catch (Exception e){
            Assert.Equal("Start date cannot be after end date", e.Message);
        }


        var events = await eventService.GetAllEvents();
        Assert.Empty(events);
    }

    [Fact]
    public async Task CreateEventWithSameDates_ReturnsEvent(){

        var context = GetMockDbContext("CreateEventWithSameDates");
        
        var eventService = new EventService(context);
        var newEvent = new CreateEventDto
        {
            Name = "SameDatesEvent",
            Description = "Description 3",
            Location = "Location 3",
            StartDate = "2021-01-03",
            StartTime = "12:00",
            EndDate = "2021-01-03",
            EndTime = "13:00",
            TableAmount = 1
        };

        var result = await eventService.CreateEvent(newEvent);

        Assert.Equal("SameDatesEvent", result.Name);

        var createdEvent = await eventService.GetEventById(result.Id);
        Assert.Equal("SameDatesEvent", createdEvent.Name);
    }

    [Fact]
    public async Task CreateEventWithSameDatesButInverseTimes_ReturnsError(){

        var context = GetMockDbContext("CreateEventWithSameDatesButInverseTimes");
        
        var eventService = new EventService(context);
        var newEvent = new CreateEventDto
        {
            Name = "SameDatesInverseTimesEvent",
            Description = "Description 3",
            Location = "Location 3",
            StartDate = "2021-01-03",
            StartTime = "13:00",
            EndDate = "2021-01-03",
            EndTime = "12:00",
            TableAmount = 1
        };

        try{
            var result = await eventService.CreateEvent(newEvent);
        } catch (Exception e){
            Assert.Equal("Start time cannot be after end time", e.Message);
        }

        var events = await eventService.GetAllEvents();
        Assert.Empty(events);
    }

    [Fact]
    public async Task CreateEventWithInvalidStartDate_ReturnsError(){

        var context = GetMockDbContext("CreateEventWithInvalidStartDate");
        
        var eventService = new EventService(context);
        var newEvent = new CreateEventDto
        {
            Name = "InvalidStartDateEvent",
            Description = "Description 3",
            Location = "Location 3",
            StartDate = "2021-01-32",
            StartTime = "12:00",
            EndDate = "2021-01-03",
            EndTime = "13:00",
            TableAmount = 1
        };

        try{
            var result = await eventService.CreateEvent(newEvent);
        } catch (Exception e){
            Assert.Equal("Invalid start date", e.Message);
        }

        var events = await eventService.GetAllEvents();
        Assert.Empty(events);
    }

    [Fact]
    public async Task CreateEventWithInvalidEndDate_ReturnsError(){

        var context = GetMockDbContext("CreateEventWithInvalidEndDate");
        
        var eventService = new EventService(context);
        var newEvent = new CreateEventDto
        {
            Name = "InvalidEndDateEvent",
            Description = "Description 3",
            Location = "Location 3",
            StartDate = "2021-01-03",
            StartTime = "12:00",
            EndDate = "2021-01-32",
            EndTime = "13:00",
            TableAmount = 1
        };

        try{
            var result = await eventService.CreateEvent(newEvent);
        } catch (Exception e){
            Assert.Equal("Invalid end date", e.Message);
        }

        var events = await eventService.GetAllEvents();
        Assert.Empty(events);
    }


    [Fact]
    public async Task CreateEventWithInvalidStartTime_ReturnsError(){

        var context = GetMockDbContext("CreateEventWithInvalidStartTime");
        
        var eventService = new EventService(context);
        var newEvent = new CreateEventDto
        {
            Name = "InvalidStartTimeEvent",
            Description = "Description 3",
            Location = "Location 3",
            StartDate = "2021-01-03",
            StartTime = "25:00",
            EndDate = "2021-01-03",
            EndTime = "13:00",
            TableAmount = 1
        };

        try{
            var result = await eventService.CreateEvent(newEvent);
        } catch (Exception e){
            Assert.Equal("Invalid start time", e.Message);
        }

        var events = await eventService.GetAllEvents();
        Assert.Empty(events);
    }

    [Fact]
    public async Task CreateEventWithInvalidEndTime_ReturnsError(){

        var context = GetMockDbContext("CreateEventWithInvalidEndTime");
        
        var eventService = new EventService(context);
        var newEvent = new CreateEventDto
        {
            Name = "InvalidEndTimeEvent",
            Description = "Description 3",
            Location = "Location 3",
            StartDate = "2021-01-03",
            StartTime = "12:00",
            EndDate = "2021-01-03",
            EndTime = "25:00",
            TableAmount = 1
        };

        try{
            var result = await eventService.CreateEvent(newEvent);
        } catch (Exception e){
            Assert.Equal("Invalid end time", e.Message);
        }

        var events = await eventService.GetAllEvents();
        Assert.Empty(events);
    }


}
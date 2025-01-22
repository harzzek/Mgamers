using System.Net.Http;
using System.Net.Http.Headers;
using backend.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Xunit;
using Newtonsoft.Json;
using System.Text;

namespace backend.test.integrationTests
{
    public class EventIntegrationTests : IClassFixture<WebApplicationFactory<Program>>{

        private readonly HttpClient _client;

        public EventIntegrationTests(){
            // IMPORTANT! Login to get token and replace the token below
            var token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIzIiwibmFtZSI6InRlc3QiLCJyb2xlIjpbIkFkbWluIiwiVXNlciIsIkd1ZXN0Il0sIm5iZiI6MTczNzU1NDY2MSwiZXhwIjoxNzM4MTU5NDYxLCJpYXQiOjE3Mzc1NTQ2NjEsImlzcyI6Imh0dHA6Ly84Ny41OS4yNDkuOTU6ODA4MCIsImF1ZCI6Imh0dHA6Ly84Ny41OS4yNDkuOTU6ODA4MCJ9.GarXE-PijDKe1nCoBaDlFEvOzkU06-qY41QkcjROw3KnVLgAKXDWqj0Jy7xVhD6rwmMyyez1TrfEK0PVZ5E30A";
            
            _client = new HttpClient{
                BaseAddress = new Uri("http://localhost:8080")
            };
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        }

        [Fact]
        public async Task GetAllEvents_ReturnsSuccessStatusCode()
        {

            var response = await _client.GetAsync("/api/event");
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            Assert.NotNull(responseString);
        }

        [Fact]
        public async Task GetEventById_ReturnsSuccessStatusCode()
        {
            var response = await _client.GetAsync("/api/event/1");
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            Assert.NotNull(responseString);
        }

        [Fact]
        public async Task CreateEvent_ReturnsEvent()
        {
           var eventItem = new CreateEventDto{
                Name = "Integration test event",
                Description = "Integration test event description",
                Location = "Integration test event location",
                StartDate = "2025-09-01",
                StartTime = "10:00",
                EndDate = "2025-09-01",
                EndTime = "12:00",
                TableAmount = 10
           };

            var json = JsonConvert.SerializeObject(eventItem);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _client.PostAsync("/api/event", data);

            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            var eventResponse = JsonConvert.DeserializeObject<Event>(responseString);

            Assert.NotNull(eventResponse);
        }

    }
}
namespace backend.DTO
{
    public class RegisterForEventDto {
        public int UserId { get; set; }
        public int EventId { get; set; }

        public List<int> SeatIds { get; set; }
    }
}
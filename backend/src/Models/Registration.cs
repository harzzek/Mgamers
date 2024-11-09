using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models{
    [Table("registrations")]
    public class Registration{
        
        [Required]
        [Column("user_id")]
        public int UserId { get; set; }
        [Required]
        [Column("event_id")]
        public int EventId { get; set; }
        [Required]
        [Column("seat_id")]
        public int SeatId { get; set; }

        [ForeignKey(nameof(UserId))]
        [JsonIgnore]
        public User User { get; set; }

        [ForeignKey(nameof(EventId))]
        [JsonIgnore]
        public Event Event { get; set; }

        [ForeignKey(nameof(SeatId))]
        [JsonIgnore]
        public Seat Seat { get; set; }

        public Registration(){
        }
        

        public Registration(int userId, int eventId, int seatId){
            UserId = userId;
            EventId = eventId;
            SeatId = seatId;
        }
    }
}
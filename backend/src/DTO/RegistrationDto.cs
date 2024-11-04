using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;

namespace backend.DTO
{
    public class RegistrationDto {

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
        public SimpleUserDto User { get; set; }

        public RegistrationDto(){
        }
    }
}
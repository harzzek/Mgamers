using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Table("tables")]
    public class Table
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("event_id")]
        public int EventId { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(EventId))]
        public Event Event { get; set; }
        
        [JsonIgnore]
        public List<Seat> Seats { get; set; } = new List<Seat>();

        public Table()
        {

        }
    }
    
}
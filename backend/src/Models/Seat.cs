using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Table("seats")]
    public class Seat{
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [ForeignKey(nameof(TableId))]
        [JsonIgnore]
        public Table Table { get; set; }

        [Column("table_id")]
        [JsonIgnore]
        public int TableId { get; set; }

        [JsonIgnore]
        public Registration Registration { get; set; }

        public Seat()
        {
        }
    }
    
}
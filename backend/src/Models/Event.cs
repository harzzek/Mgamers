using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Table("events")]
    public class Event
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("name")]
        public string Name { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Required]
        [Column("location")]
        public string Location { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [Column("start_date", TypeName = "timestamp")]
        public DateTime StartDate { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [Column("end_date", TypeName = "timestamp")]
        public DateTime EndDate { get; set; }

        [JsonIgnore]
        public List<Table> Tables { get; set; } = new List<Table>();

        [JsonIgnore]
        public List<Registration> Registrations { get; set; } = new List<Registration>();

        public Event()
        {

        }

        public Event(int id, string name, string description, string location, string startDate, string endDate, List<Registration> registrations){
            Id = id;
            Name = name;
            Description = description;
            Location = location;
            StartDate = DateTime.Parse(startDate);
            EndDate = DateTime.Parse(endDate);
            Registrations = registrations;
        }

    }
}
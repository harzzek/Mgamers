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
        [Column("start_date")]
        public string StartDate { get; set; }

        [Required]
        [Column("start_time")]
        public string StartTime { get; set; }

        [Required]
        [Column("end_date")]
        public string EndDate { get; set; }

        [Required]
        [Column("end_time")]
        public string EndTime { get; set; }

        [JsonIgnore]
        public List<Table> Tables { get; set; } = new List<Table>();

        [JsonIgnore]
        public List<Registration> Registrations { get; set; } = new List<Registration>();

        public Event()
        {

        }

        public Event(int id, string name, string description, string location, string startDate, string startTime, string endDate, string endTime, List<Registration> registrations){
            Id = id;
            Name = name;
            Description = description;
            Location = location;
            StartDate = startDate;
            StartTime = startTime;
            EndDate = endDate;
            EndTime = endTime;
            Registrations = registrations;

        }

    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class EventDto
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
}
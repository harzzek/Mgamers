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
    [DataType(DataType.Date)]
    [Column("start_date")]
    public DateTime StartDate { get; set; }

    [Required]
    [DataType(DataType.Date)]
    [Column("end_date")]
    public DateTime EndDate { get; set; }
}
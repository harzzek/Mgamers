using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.DTO;
using backend.Models;

public class EventDetailsDTO
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
    [DataType(DataType.Date)]
    public DateTime StartDate { get; set; }

    [Required]
    [Column("end_date")]
    [DataType(DataType.Date)]
    public DateTime EndDate { get; set; }

    [ForeignKey("UserId")]
    public List<RegistrationDto> Participants { get; set; } = new List<RegistrationDto>();

    [ForeignKey("EventId")]
    public List<TableDto> Tables { get; set; } = new List<TableDto>();

}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;

public class TableDto
{
    [Key]
    [Column("id")]
    public int Id { get; set; }
    [Required]
    [Column("event_id")]
    public int EventId { get; set; }

    [ForeignKey("table_id")]
    public List<Seat> Seats { get; set; } = new List<Seat>();
    public TableDto()
    {
    }

}
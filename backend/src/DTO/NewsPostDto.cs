using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class NewsPostDto
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("letter")]
    public string Letter { get; set; }

    [Required]
    [Column("creator_id")]
    public int Creator { get; set; }
}
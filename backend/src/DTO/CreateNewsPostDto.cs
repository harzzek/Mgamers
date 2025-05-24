using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class CreateNewsPostDto
{
    [Required]
    [Column("letter")]
    public string Letter { get; set; }

}
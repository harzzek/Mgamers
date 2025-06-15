
using System.ComponentModel.DataAnnotations;
using backend.Models;

public class SimpleUserDto
{

    [Key]
    public int Id { get; set; }
    [Required]
    public string Username { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    public IList<Role> Roles { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime CreatedAt { get; set; }
}
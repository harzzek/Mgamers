
using System.ComponentModel.DataAnnotations;
using backend.Models;

public class UserDto
{

    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    public string Birthdate { get; set; }

    [Required]
    public string CreatedAt { get; set; }

    [Required]
    public IList<Role> Roles { get; set; }

    public string? Address { get; set; }

    public string? PhoneNumber { get; set; }

    public string? PostNumber { get; set; }

}
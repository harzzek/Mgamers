
using System.ComponentModel.DataAnnotations;
using backend.Models;

public class UpdateUserDto
{
    public string Name { get; set; }

    public string? Address { get; set; }

    public string? PhoneNumber { get; set; }
    
    public string? PostNumber { get; set; }
}
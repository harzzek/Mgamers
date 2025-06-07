
using System.ComponentModel.DataAnnotations;
using backend.Models;

public class UpdateUserDto
{
    public string Name { get; set; }

    public string Address { get; set; }

    public int PhoneNumber { get; set; }
    
    public int PostNumber { get; set; }
}
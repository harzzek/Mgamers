
using System.ComponentModel.DataAnnotations;
using backend.Models;



public class SimpleUserDto{

    [Key]
    public int Id { get; set; }
    [Required]
    public string Username { get; set; }

}
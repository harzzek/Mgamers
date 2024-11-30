
using System.ComponentModel.DataAnnotations;
using backend.Models;

public class UpdateUserDto{


    public string Username { get; set; }

    public string Name { get; set; }

    public string Birthdate { get; set; }
}
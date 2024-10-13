using System.ComponentModel.DataAnnotations;

public class RegisterDTO{

    [Required]
    public string Name { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }

    [Required]
    public string Birthdate { get; set; }

}
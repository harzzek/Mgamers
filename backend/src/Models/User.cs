using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    [Table("AspNetUsers")] 
    public class User : IdentityUser<int>
    {

        [Key]
        [Column("id")]
        public override int Id { get; set; }
        
        [Required]
        [Column("name")]
        public string Name { get; set; }

        [Required]
        [Column("username")]
        public override string UserName { get; set; }

        [Required]
        [EmailAddress]
        [Column("email")]
        public override string Email { get; set; }

        [Required]
        [Column("birthdate")]
        public string Birthdate { get; set; }

        [JsonIgnore]
        public List<Registration> Registrations { get; set; } = new List<Registration>();

        public User()
        {

        }

        public User(int id, string name, string username, string email, string birthdate, List<Registration> registratedEvents)
        {
            Id = id;
            Name = name;
            UserName = username;
            Email = email;
            Birthdate = birthdate;
            Registrations = registratedEvents;

        }

    }
}
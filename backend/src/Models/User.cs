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

        [Required]
        [DataType(DataType.Date)]
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("address")]
        public string? Address { get; set; }

        [Column("phonenumber")]
        public override string? PhoneNumber { get; set; }

        [Column("postnumber")]
        public string? PostNumber { get; set; }

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

        public static implicit operator User(IdentityResult v)
        {
            throw new NotImplementedException();
        }
    }
}
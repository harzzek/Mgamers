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

        // Has many roles
        [JsonIgnore]
        public ICollection<Role>? UserRoles { get; set; }

        public User()
        {
        }

        public User(int id, string name, string username, string email, ICollection<Role> userRoles)
        {
            Id = id;
            Name = name;
            UserName = username;
            Email = email;
            UserRoles = userRoles;
        }

    }
}
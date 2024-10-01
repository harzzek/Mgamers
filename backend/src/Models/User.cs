using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("users")] 
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }
        
        [Required]
        [Column("name")]
        public string Name { get; set; }

        [Required]
        [Column("username")]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        [Column("email")]
        public string Email { get; set; }

        [Required]
        [Column("password")]
        public string Password { get; set; }

        [Required]
        [Column("role_id")]
        public int RoleId { get; set; }

        
        [ForeignKey("RoleId")]
        public Role Role { get; set; }

        public User()
        {
        }

        public User(int id, string name, string username, string email, string password, Role role)
        {
            Id = id;
            Name = name;
            Username = username;
            Email = email;
            Password = password;
            Role = role;
            RoleId = role.Id;
        }

    }
}
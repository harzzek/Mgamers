using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    [Table("AspNetRoles")]
    public class Role: IdentityRole<int>
    {
        [Key]
        [Column("id")]
        public override int Id { get; set; }
        
        [Column("name")]
        public override string Name { get; set; }

        public Role()
        {
        }

        public Role(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
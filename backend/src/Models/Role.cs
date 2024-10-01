using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Table("roles")]
    public class Role
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("name")]
        public string Name { get; set; }

        [JsonIgnore]
        public ICollection<User>? Users { get; set; }

        public Role()
        {
        }

        public Role(int id, string name)
        {
            this.Id = id;
            this.Name = name;
        }
    }
}
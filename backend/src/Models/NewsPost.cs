using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Table("newspost")]
    public class NewsPost
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("letter")]
        public string Letter { get; set; }

        [Required]
        [Column("creator_id")]
        public int Creator { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [ForeignKey(nameof(Creator))]
        [JsonIgnore]
        public User User { get; set; }
    }
}
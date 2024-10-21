using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace backend.Models{
    public class Token
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("UserId")]
        public int UserId { get; set; }

        [Required]
        [Column("token_value")]
        public string TokenValue { get; set; }

        [Required]
        [Column("expiry_date")]
        public string ExpiryDate { get; set; }

        [Required]
        [Column("created_date")]
        public string CreatedDate { get; set; }

        [Required]
        [Column("is_expired")]
        public bool IsExpired { get; set; }
    }
}
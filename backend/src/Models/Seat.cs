namespace backend.Models
{
    public class Seat{
        public int Id { get; set; }
        
        public User User { get; set; }

        public Table Table { get; set; }

        public Seat()
        {
        }
    }
    
}
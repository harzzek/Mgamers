namespace backend.Models
{
    public class Table
    {
        public int Id { get; set; }

        public Seat[] seats { get; set; }

        public Table()
        {
            seats = new Seat[2];
        }
    }
    
}
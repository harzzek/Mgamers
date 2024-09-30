namespace backend.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public int Capacity { get; set; }
        public List<User> Registered { get; set; }

        public Event(int id, string name, string description, DateTime date, string location, int capacity, List<User> registered)
        {
            Id = id;
            Name = name;
            Description = description;
            Date = date;
            Location = location;
            Capacity = capacity;
            Registered = registered;
        }
    }
}
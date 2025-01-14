namespace MeleeIndex.Contracts
{
    public class PostModel
    {
        public Guid Id { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public required string Title { get; set; }

        public required string Summary { get; set; }

        public required Uri Url { get; set; }

        public required List<string> Tags { get; set; }
    }
}

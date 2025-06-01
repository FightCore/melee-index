namespace MeleeIndex.Contracts
{
    public class SourceModel
    {
        public Guid Id { get; set; }

        public required string Name { get; set; }

        public required string Description { get; set; }

        public required Uri Url { get; set; }
    }
}

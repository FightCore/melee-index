using MeleeIndex.Models.Abstract;

namespace MeleeIndex.Models
{
    public class Post : TrackableEntity
    {
        public required string Title { get; set; }

        public required string Summary { get; set; }

        public required Uri Url { get; set; }

        public required Author Author { get; set; }

        public required Category Category { get; set; }

        public required Submitter Submitter { get; set; }

        public required Source Source { get; set; }

        public Guid SourceId { get; set; }

        public required List<Tag> Tags { get; set; }

        public Image? Image { get; set; }
    }
}

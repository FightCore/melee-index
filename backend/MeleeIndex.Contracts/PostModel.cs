namespace MeleeIndex.Contracts;

public class PostModel
{
    public Guid Id { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public required string Title { get; set; }

    public required string Summary { get; set; }

    public required Uri Url { get; set; }

    public required IEnumerable<string> Tags { get; set; }

    public required AuthorModel Author { get; set; }

    public required SourceModel Source { get; set; }

    public required CategoryModel Category { get; set; }
}

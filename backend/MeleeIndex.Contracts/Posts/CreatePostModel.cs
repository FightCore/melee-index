namespace MeleeIndex.Contracts.Posts;

public class CreatePostModel
{
    public string Title { get; set; }

    public string Url { get; set; }

    public string Summary { get; set; }

    public DateTime Created { get; set; }

    public DateTime Modified { get; set; }

    public string Author { get; set; }

    public string Source { get; set; }

    public string Category { get; set; }

    public string Submitter { get; set; }

    public List<string> Tags { get; set; }
}

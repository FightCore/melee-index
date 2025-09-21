namespace MeleeIndex.Contracts.Posts;

public class CreatePostModel
{
    public string Title { get; set; }

    public string Url { get; set; }

    public string Summary { get; set; }

    public DateTime Created { get; set; }

    public DateTime Modified { get; set; }
}

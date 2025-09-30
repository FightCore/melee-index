namespace MeleeIndex.Contracts.Posts;

public class PostModel
{
    public int Id { get; set; }
    
    public string DocumentId { get; set; }
    
    public string Title { get; set; }
    
    public string? Description { get; set; }
    
    public string Slug { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime UpdatedAt { get; set; }
    
    public DateTime? PublishedAt { get; set; }

    public CategoryModel Category { get; set; }
    
    public AuthorModel Author { get; set; }
    
    public List<CharacterModel> Characters { get; set; }
    
    public ImageModel Cover { get; set; }
}

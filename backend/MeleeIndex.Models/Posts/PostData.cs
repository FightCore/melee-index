using MeleeIndex.Models.Serialization;

namespace MeleeIndex.Models.Posts;

public class PostData : JsonExtendableData
{
    public int Id { get; set; }
    
    public string DocumentId { get; set; }
    
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public string Slug { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime UpdatedAt { get; set; }
    
    public DateTime? PublishedAt { get; set; }
    
    public CategoryData Category { get; set; }
    
    public AuthorData Author { get; set; }
    
    public List<CharacterData> Characters { get; set; }
    
    public ImageData Cover { get; set; }
}

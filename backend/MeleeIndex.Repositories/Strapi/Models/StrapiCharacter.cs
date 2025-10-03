namespace MeleeIndex.Repositories.Strapi.Models;

public class StrapiCharacter
{
    public int Id { get; set; }
    
    public string Slug { get; set; }
    
    public string Name { get; set; }
    
    public string DocumentId { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime UpdatedAt { get; set; }
    
    public DateTime? PublishedAt { get; set; }
}

using MeleeIndex.Repositories.Serialization;

namespace MeleeIndex.Repositories.Strapi.Models;

public class Article : JsonExtendableData
{
    public int Id { get; set; }
    
    public string DocumentId { get; set; }
    
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public string Slug { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime UpdatedAt { get; set; }
    
    public DateTime? PublishedAt { get; set; }
    
    public List<object> Blocks { get; set; }
    
    public Author Author { get; set; }
}

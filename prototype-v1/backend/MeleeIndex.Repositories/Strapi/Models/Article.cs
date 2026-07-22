using MeleeIndex.Repositories.Serialization;

namespace MeleeIndex.Repositories.Strapi.Models;

public class Article : StrapiDocument
{
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public string Slug { get; set; }
    
    public DateTime? PublishedAt { get; set; }
    
    public List<object> Blocks { get; set; }
    
    public StrapiAuthor Author { get; set; }
}

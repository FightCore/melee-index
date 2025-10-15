namespace MeleeIndex.Repositories.Strapi.Models;

public class StrapiCategory : StrapiDocument
{
    public string Slug { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public DateTime? PublishedAt { get; set; }
}

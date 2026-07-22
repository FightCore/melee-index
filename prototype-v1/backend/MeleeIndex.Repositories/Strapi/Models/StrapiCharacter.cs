namespace MeleeIndex.Repositories.Strapi.Models;

public class StrapiCharacter : StrapiDocument
{
    public string Slug { get; set; }
    
    public string Name { get; set; }
    
    public DateTime? PublishedAt { get; set; }
}

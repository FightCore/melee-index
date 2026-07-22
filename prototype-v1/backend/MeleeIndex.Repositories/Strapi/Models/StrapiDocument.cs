using MeleeIndex.Repositories.Serialization;

namespace MeleeIndex.Repositories.Strapi.Models;

public class StrapiDocument : JsonExtendableData
{
    public int Id { get; set; }
    
    public string DocumentId { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime UpdatedAt { get; set; }
    
    public DateTime? PublishedAt { get; set; }
}

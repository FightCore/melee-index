using MeleeIndex.Repositories.Serialization;

namespace MeleeIndex.Repositories.Strapi.Models;

public class Author : JsonExtendableData
{
    public int Id { get; set; }
    
    public string DocumentId { get; set; }
    
    public string Name { get; set; }
    
    public string Email { get; set; }
}

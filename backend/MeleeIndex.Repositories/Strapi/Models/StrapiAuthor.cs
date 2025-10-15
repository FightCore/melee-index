using MeleeIndex.Repositories.Serialization;

namespace MeleeIndex.Repositories.Strapi.Models;

public class StrapiAuthor : StrapiDocument
{
    public string Name { get; set; }
    
    public string Email { get; set; }
}

using MeleeIndex.Models.DataEntities;

namespace MeleeIndex.Repositories.Strapi.Models;

public class StrapiCharacterGuide : StrapiDocument
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string Slug { get; set; }
    
    public CharacterData Character { get; set; }
}

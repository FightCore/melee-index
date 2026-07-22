namespace MeleeIndex.Repositories.Strapi.Models;

public class StrapiGlossaryItem : StrapiDocument
{
    public string Name { get; set; }

    public string Description { get; set; }
    
    public string Slug { get; set; }
}

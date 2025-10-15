using MeleeIndex.Models.Serialization;

namespace MeleeIndex.Models.DataEntities;

public class ResourceData : JsonExtendableData
{
    public string Name { get; set; }
    
    public string Slug { get; set; }
    
    public string Description { get; set; }
    
    public string Url { get; set; }
    
    public ImageData? Icon { get; set; }
    
    public ImageData? Preview { get; set; }
    
    public SourceData Source { get; set; }
    
    public List<CharacterData> Characters { get; set; }
    
    public AuthorData? Author { get; set; }
}

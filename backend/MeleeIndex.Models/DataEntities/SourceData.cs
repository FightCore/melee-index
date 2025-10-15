using MeleeIndex.Models.Serialization;

namespace MeleeIndex.Models.DataEntities;

public class SourceData : JsonExtendableData
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string Slug { get; set; }
    
    public string Url { get; set; }
}

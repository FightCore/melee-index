using MeleeIndex.Models.Serialization;
using System.Text.Json.Serialization;

namespace MeleeIndex.Models.DataEntities;

public class CollectionData : JsonExtendableData
{
    [JsonPropertyName("name")]
    public string Name { get; set; }
    
    [JsonPropertyName("description")]
    public string Description { get; set; }
    
    [JsonPropertyName("articles")]
    public List<PostData> Articles { get; set; }
    
    [JsonPropertyName("resources")]
    public List<ResourceData> Resources { get; set; }
}

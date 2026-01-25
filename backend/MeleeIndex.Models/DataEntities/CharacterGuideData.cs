using MeleeIndex.Models.Serialization;
using System.Text.Json.Serialization;

namespace MeleeIndex.Models.DataEntities;

public class CharacterGuideData : JsonExtendableData
{
    [JsonPropertyName("name")]
    public string Name { get; set; }
    
    [JsonPropertyName("description")]
    public string Description { get; set; }
    
    [JsonPropertyName("slug")]
    public string Slug { get; set; }
    
    [JsonPropertyName("character")]
    public CharacterData Character { get; set; }
}

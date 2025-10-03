using MeleeIndex.Models.Serialization;
using System.Text.Json.Serialization;

namespace MeleeIndex.Models.DataEntities;

public class CategoryData : JsonExtendableData
{
    [JsonPropertyName("name")]
    public string Name { get; set; }
    
    [JsonPropertyName("slug")]
    public string Slug { get; set; }
}

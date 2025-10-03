using MeleeIndex.Models.Serialization;
using System.Text.Json.Serialization;

namespace MeleeIndex.Models.DataEntities;

public class ImageData : JsonExtendableData
{
    [JsonPropertyName("url")]
    public string Url { get; set; }
    
    [JsonPropertyName("alternativeText")]
    public string? AlternativeText { get; set; }
}

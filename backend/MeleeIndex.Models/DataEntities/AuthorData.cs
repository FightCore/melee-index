using MeleeIndex.Models.Serialization;
using System.Text.Json.Serialization;

namespace MeleeIndex.Models.DataEntities;

public class AuthorData : JsonExtendableData
{
    [JsonPropertyName("name")]
    public string Name { get; set; }
    
    [JsonPropertyName("avatar")]
    public ImageData Avatar { get; set; }
}

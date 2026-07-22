using System.Text.Json;
using System.Text.Json.Serialization;

namespace MeleeIndex.Models.Serialization;

public abstract class JsonExtendableData
{
    [JsonExtensionData]
    public Dictionary<string, JsonElement> AdditionalProperties { get; set; }
}

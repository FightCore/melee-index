using MeleeIndex.Models.Serialization;

namespace MeleeIndex.Models.Posts;

public class CharacterData : JsonExtendableData
{
    public string Name { get; set; }
    
    public string Slug { get; set; }
}

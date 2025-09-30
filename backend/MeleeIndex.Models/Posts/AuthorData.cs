using MeleeIndex.Models.Serialization;

namespace MeleeIndex.Models.Posts;

public class AuthorData : JsonExtendableData
{
    public string Name { get; set; }
    
    public ImageData Avatar { get; set; }
}

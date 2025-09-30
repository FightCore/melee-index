using MeleeIndex.Models.Serialization;

namespace MeleeIndex.Models.Posts;

public class ImageData : JsonExtendableData
{
    public string Url { get; set; }
    
    public string AlternativeText { get; set; }
}

using MeleeIndex.Models.Abstract;

namespace MeleeIndex.Models;

public class Post : TrackableEntity
{
    public string DocumentId { get; set; }
    
    public int StrapiId { get; set; }
    
    public DateTime? PublishedAt { get; set; }
    
    public string PostData { get; set; }
}

using MeleeIndex.Models.Abstract;
using MeleeIndex.Models.Posts;

namespace MeleeIndex.Models;

public class Post : TrackableEntity
{
    public string DocumentId { get; set; }
    
    public int StrapiId { get; set; }
    
    public DateTime? PublishedAt { get; set; }
    
    public PostData PostData { get; set; }
}

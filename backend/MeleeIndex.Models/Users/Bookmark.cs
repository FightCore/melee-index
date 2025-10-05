using MeleeIndex.Models.Abstract;

namespace MeleeIndex.Models.Users;

public class Bookmark : TrackableEntity
{
    public User User { get; set; }
    
    public Guid UserId { get; set; }
    
    public Post Post { get; set; }
    
    public Guid PostId { get; set; }
}

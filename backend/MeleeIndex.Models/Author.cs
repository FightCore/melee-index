using MeleeIndex.Models.Abstract;
using MeleeIndex.Models.DataEntities;

namespace MeleeIndex.Models;

public class Author : TrackableEntity
{
    public string DocumentId { get; set; }
    
    public int StrapiId { get; set; }
    
    public AuthorData AuthorData { get; set; }
}

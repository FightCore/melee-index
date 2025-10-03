using MeleeIndex.Models.Abstract;
using MeleeIndex.Models.DataEntities;

namespace MeleeIndex.Models;

public class Category : TrackableEntity
{
    public string DocumentId { get; set; }
    
    public int StrapiId { get; set; }

    public CategoryData CategoryData { get; set; }
}

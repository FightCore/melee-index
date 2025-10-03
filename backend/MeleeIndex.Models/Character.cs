using MeleeIndex.Models.Abstract;
using MeleeIndex.Models.DataEntities;

namespace MeleeIndex.Models;

public class Character : TrackableEntity
{
    public string DocumentId { get; set; }
    
    public int StrapiId { get; set; }
    
    public CharacterData CharacterData { get; set; }
}

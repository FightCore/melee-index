namespace MeleeIndex.Models.Abstract;

public abstract class TrackableEntity : IEntity
{
    public Guid Id { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}

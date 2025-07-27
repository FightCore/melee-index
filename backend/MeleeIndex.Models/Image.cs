using MeleeIndex.Models.Abstract;

namespace MeleeIndex.Models;

public class Image : IEntity
{
    public Guid Id { get; set; }

    public required Uri Url { get; set; }
}

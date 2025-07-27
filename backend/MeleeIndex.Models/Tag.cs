using MeleeIndex.Models.Abstract;

namespace MeleeIndex.Models;

public class Tag : IEntity
{
    public Guid Id { get; set; }

    public required string Name { get; set; }
}

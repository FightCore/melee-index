using MeleeIndex.Models.Abstract;

namespace MeleeIndex.Models;

public class Category : IEntity
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public required string Color { get; set; }
}

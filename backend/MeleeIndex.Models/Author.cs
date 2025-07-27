using MeleeIndex.Models.Abstract;

namespace MeleeIndex.Models;

public class Author : IEntity
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public string? Twitter { get; set; }

    public string? YouTube { get; set; }

    public string? Twitch { get; set; }

    public string? BlueSky { get; set; }

    public Image? Image { get; set; }
}

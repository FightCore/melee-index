namespace MeleeIndex.Configurations;

public class DiscordConfiguration
{
    public const string Key = "OAuth:Discord";

    public required string ClientId { get; set; }

    public required string ClientSecret { get; set; }

    public required string CallBack { get; set; }
}

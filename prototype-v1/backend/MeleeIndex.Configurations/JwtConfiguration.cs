namespace MeleeIndex.Configurations;

public class JwtConfiguration
{
    public const string Key = "OAuth:Jwt";

    public required string Issuer { get; set; }

    public required string Audience { get; set; }

    public required string Secret { get; set; }

    public required int ExpiryMinutes { get; set; }
}

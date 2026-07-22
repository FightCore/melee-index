namespace MeleeIndex.Services.Authentication;

public class OAuthUser
{
    public required Guid Id { get; set; }

    public required string Email { get; set; }

    public required string Username { get; set; }

    public required string Provider { get; set; }

    public required string ProviderId { get; set; }

    public required bool Admin { get; set; }
}

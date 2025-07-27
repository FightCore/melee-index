using MeleeIndex.Api.Exceptions;
using MeleeIndex.Configurations;
using Microsoft.AspNetCore.Authentication;
using System.Globalization;

namespace MeleeIndex.Api.Startup;

public static class AuthenticationExtensions
{
    public static AuthenticationBuilder AddConfiguredDiscordAuthentication(
        this AuthenticationBuilder authenticationBuilder, IConfiguration configuration)
    {
        return authenticationBuilder.AddDiscord(options =>
        {
            var discordOptions = configuration.GetSection(DiscordConfiguration.Key).Get<DiscordConfiguration>() ?? throw new MissingConfigurationException($"Missing the {DiscordConfiguration.Key} configuration.");
            options.ClientId = discordOptions.ClientId;
            options.ClientSecret = discordOptions.ClientSecret;
            options.CallbackPath = discordOptions.CallBack;
            options.SaveTokens = true;

            options.CorrelationCookie.SameSite = SameSiteMode.Lax;
            options.CorrelationCookie.SecurePolicy = CookieSecurePolicy.Always;

            options.ClaimActions.MapCustomJson("urn:discord:avatar:url", user =>
                string.Format(
                    CultureInfo.InvariantCulture,
                    "https://cdn.discordapp.com/avatars/{0}/{1}.{2}",
                    user.GetString("id"),
                    user.GetString("avatar"),
                    user.GetString("avatar")!.StartsWith("a_") ? "gif" : "png"));

            options.ClaimActions.MapCustomJson("urn:discord:global_name", user =>
                user.TryGetProperty("global_name", out var globalName) ? globalName.GetString() : null);

            options.Scope.Add("identify");
            options.Scope.Add("email");
        });
    }
}

using MeleeIndex.Configurations;
using MeleeIndex.Services.Authentication;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;
using System.Text;

namespace MeleeIndex.Startup;

public static class AuthenticationExtensions
{
    public static IServiceCollection AddMeleeIndexAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var jwtConfiguration = configuration.GetSection(JwtConfiguration.Key).Get<JwtConfiguration>();
        services.Configure<JwtConfiguration>(configuration.GetSection(JwtConfiguration.Key));
        services.Configure<OAuthConfiguration>(configuration.GetSection(OAuthConfiguration.Key));
        
        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            })
            .AddCookie()
            .AddConfiguredDiscordAuthentication(configuration)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtConfiguration.Issuer,
                    ValidAudience = jwtConfiguration.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfiguration.Secret))
                };
            });
        services.AddAuthorization(options =>
        {
            options.AddPolicy("ObjectCreation", policy => policy.RequireClaim(CustomClaims.Admin, "True", "true"));
        });

        return services;
    }
    
    public static AuthenticationBuilder AddConfiguredDiscordAuthentication(
        this AuthenticationBuilder authenticationBuilder, IConfiguration configuration)
    {
        return authenticationBuilder.AddDiscord(options =>
        {
            var discordOptions = configuration.GetSection(DiscordConfiguration.Key).Get<DiscordConfiguration>();
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

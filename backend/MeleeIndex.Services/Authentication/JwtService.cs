using MeleeIndex.Configurations;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MeleeIndex.Services.Authentication;

public interface IJwtService
{
    string CreateToken(OAuthUser user);
}

internal class JwtService : IJwtService
{
    private readonly string _jwtSecret;
    private readonly string _issuer;
    private readonly string _audience;
    private readonly int _expiryMinutes;

    public JwtService(IOptions<JwtConfiguration> configuration)
    {
        var jwtConfiguration = configuration.Value;
        _jwtSecret = jwtConfiguration.Secret;
        _issuer = jwtConfiguration.Issuer;
        _audience = jwtConfiguration.Audience;
        _expiryMinutes = jwtConfiguration.ExpiryMinutes;
    }

    public string CreateToken(OAuthUser user)
    {
        var claims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new (JwtRegisteredClaimNames.Name, user.Username),
            new (CustomClaims.Provider, user.Provider),
            new (CustomClaims.ProviderId, user.ProviderId),
        };

        if (user.Admin)
        {
            claims.Add(new Claim(CustomClaims.Admin, "true"));
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_expiryMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

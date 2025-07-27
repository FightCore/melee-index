using AspNet.Security.OAuth.Discord;
using MeleeIndex.Api.Authentication.Discord;
using MeleeIndex.Api.Exceptions;
using MeleeIndex.Configurations;
using MeleeIndex.Services.Authentication;
using MeleeIndex.Services.Users;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Claims;

namespace MeleeIndex.Api.Controllers;

[Route("[controller]")]
[ApiController]
public class DiscordAuthenticationController(IJwtService jwtService, IOptions<OAuthConfiguration> oauthConfiguration, IUserService userService) : ControllerBase
{
    private readonly IJwtService _jwtService = jwtService;
    private readonly IUserService _userService = userService;
    private readonly OAuthConfiguration _oauthConfiguration = oauthConfiguration.Value;

    [HttpGet("/discord/login")]
    public IActionResult Login()
    {
        var properties = new AuthenticationProperties
        {
            RedirectUri = "/discord/token",
            IsPersistent = true
        };

        // Triggers the OAuth challenge and redirects the user to Discord's authorization page
        return Challenge(properties, DiscordAuthenticationDefaults.AuthenticationScheme);
    }

    [HttpGet("/discord/token")]
    public async Task<IActionResult> GetToken()
    {
        var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        if (!result.Succeeded)
        {
            return Unauthorized();
        }

        var claims = result.Principal.Claims.ToList();
        var createUser = new CreateUserDto()
        {
            Provider = "discord",
            ProviderId = GetClaimValue(claims, ClaimTypes.NameIdentifier),
            Username = GetClaimValue(claims, DiscordClaimConstants.GlobalName),
        };

        var user = await _userService.GetForProvider(createUser.Provider, createUser.ProviderId) ?? await _userService.Create(createUser);
        var oauthUser = new OAuthUser
        {
            Id = user.Id,
            Email = GetClaimValue(claims, ClaimTypes.Email),
            Username = user.Username,
            Provider = user.Provider,
            ProviderId = user.ProviderId,
            Admin = user.Admin
        };

        // Create JWT token
        var tokenString = _jwtService.CreateToken(oauthUser);

        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Redirect($"{_oauthConfiguration.FrontendCallback}{tokenString}");
    }

    private static string GetClaimValue(List<Claim>? claims, string claimType)
    {
        var claimValue = (claims?.FirstOrDefault(claim => claim.Type == claimType)?.Value) ?? throw new MissingClaimException($"Missing the claim type {claimType}");
        return claimValue;
    }
}

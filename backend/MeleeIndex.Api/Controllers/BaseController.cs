using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MeleeIndex.Api.Controllers;

public abstract class BaseController : ControllerBase
{
    public bool TryGetUserId(out Guid userId)
    {
        var idClaim = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type is JwtRegisteredClaimNames.Sub or ClaimTypes.NameIdentifier);
        if (idClaim == null)
        {
            userId = Guid.Empty;
            return false;
        }

        return Guid.TryParse(idClaim.Value, out userId);
    }
}

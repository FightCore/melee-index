using MeleeIndex.Contracts.Users;
using MeleeIndex.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MeleeIndex.Api.Controllers;

[ApiController]
[Route("me")]
public class MeController(IUserService userService) : BaseController
{
    private readonly IUserService _userService = userService;

    [HttpPut]
    [Authorize]
    public async Task<IActionResult> UpdateUser([FromBody] UpdateUserModel model)
    {
        if (!TryGetUserId(out var userId))
        {
            return Unauthorized();
        }

        var user = await _userService.Update(userId, model);
        return Ok(user);
    }
}

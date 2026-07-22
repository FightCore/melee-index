using MeleeIndex.Services.Strapi;
using Microsoft.AspNetCore.Mvc;

namespace MeleeIndex.Api.Controllers;

[ApiController]
[Route("strapi")]
public class StrapiController : BaseController
{
    private readonly IStrapiSyncService _strapiSyncService;
    
    public StrapiController(IStrapiSyncService strapiSyncService)
    {
        _strapiSyncService = strapiSyncService;
    }
    
    // Include the legacy route
    [HttpPost("sync")]
    [Route("/articles/sync")]
    public async Task<IActionResult> ExecuteSync()
    {
        await _strapiSyncService.Execute();
        return Ok();
    }
}

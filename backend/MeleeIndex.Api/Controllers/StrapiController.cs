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
    
    [HttpPost("sync")]
    // Include the legacy route
    [Route("/articles/sync")]
    public async Task<IActionResult> ExecuteSync()
    {
        await _strapiSyncService.Execute();
        return Ok();
    }
}

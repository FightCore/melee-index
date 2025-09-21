using MeleeIndex.Services.Strapi;
using Microsoft.AspNetCore.Mvc;

namespace MeleeIndex.Api.Controllers;

[ApiController]
[Route("articles")]
public class ArticleController : BaseController
{
    private readonly IArticleSyncService _articleSyncService;
    
    public ArticleController(IArticleSyncService articleSyncService)
    {
        _articleSyncService = articleSyncService;
    }
    
    [HttpPost("sync")]
    public async Task<IActionResult> ExecuteSync()
    {
        await _articleSyncService.Execute();
        return Ok();
    }
}

using MeleeIndex.Services.GlossaryItems;
using Microsoft.AspNetCore.Mvc;

namespace MeleeIndex.Api.Controllers;

[ApiController]
[Route("glossary-items")]
public class GlossaryItemController : BaseController
{
    private readonly IGlossaryItemService _glossaryItemService;

    public GlossaryItemController(IGlossaryItemService glossaryItemService)
    {
        _glossaryItemService = glossaryItemService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPost(string id)
    {
        var glossaryItem = await _glossaryItemService.Get(id);

        if (glossaryItem == null)
        {
            return NotFound();
        }
        
        return Ok(glossaryItem.Data);
    }
}

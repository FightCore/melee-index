using FluentValidation;
using MeleeIndex.Api.Errors;
using MeleeIndex.Contracts.Sources;
using MeleeIndex.Services.Exceptions;
using MeleeIndex.Services.Sources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MeleeIndex.Api.Controllers;

[Route("sources")]
[ApiController]
public class SourcesController(IValidator<CreateSourceModel> createSourceValidator, ISourceService sourceService) : ControllerBase
{
    private readonly IValidator<CreateSourceModel> _createSourceValidator = createSourceValidator;
    private readonly ISourceService _sourceService = sourceService;

    [HttpPost]
    [Authorize(Policy = "ObjectCreation")]
    public async Task<IActionResult> CreateSource([FromBody] CreateSourceModel source)
    {
        var result = await _createSourceValidator.ValidateAsync(source);
        if (!result.IsValid)
        {
            return BadRequest(ValidatorApiError.Create(result));
        }

        var createdSource = await _sourceService.Create(source);

        return Ok(createdSource);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSource([FromRoute] Guid id)
    {
        try
        {
            await _sourceService.Delete(id);
            return NoContent();
        }
        catch (SourceIsInUseException)
        {
            return BadRequest();
        }
    }
}

using FluentValidation;
using MeleeIndex.Contracts.Sources;
using MeleeIndex.Services.Exceptions;
using MeleeIndex.Services.Sources;
using Microsoft.AspNetCore.Mvc;

namespace MeleeIndex.Api.Controllers
{
    [Route("sources")]
    [ApiController]
    public class SourcesController : ControllerBase
    {
        private readonly IValidator<CreateSourceModel> _createSourceValidator;
        private readonly ISourceService _sourceService;

        public SourcesController(IValidator<CreateSourceModel> createSourceValidator, ISourceService sourceService)
        {
            _createSourceValidator = createSourceValidator;
            _sourceService = sourceService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSource([FromBody] CreateSourceModel source)
        {
            var result = await _createSourceValidator.ValidateAsync(source);
            if (!result.IsValid)
            {
                return BadRequest(result.ToDictionary());
            }

            var createdSource = await _sourceService.Create(source);

            return Ok(createdSource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSource([FromRoute]Guid id)
        {
            try
            {
                await _sourceService.Delete(id);
                return NoContent();
            }
            catch (SourceIsInUseException exception)
            {
                return BadRequest();
            }
        }
    }
}

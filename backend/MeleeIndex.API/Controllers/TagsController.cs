using FluentValidation;
using MeleeIndex.Api.Errors;
using MeleeIndex.Contracts.Tags;
using MeleeIndex.Services.Tags;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MeleeIndex.Api.Controllers
{
    [Route("tags")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly ITagService _tagService;
        private readonly IValidator<CreateTagModel> _createTagValidator;

        public TagsController(ITagService tagService, IValidator<CreateTagModel> createTagValidator)
        {
            _tagService = tagService;
            _createTagValidator = createTagValidator;
        }

        [HttpPost]
        [Authorize(Policy = "ObjectCreation")]
        [Produces("text/plain")]
        public async Task<IActionResult> CreateTag([FromBody] CreateTagModel createTagModel)
        {
            var result = await _createTagValidator.ValidateAsync(createTagModel);
            if (!result.IsValid)
            {
                return BadRequest(ValidatorApiError.Create(result));
            }

            var tag = await _tagService.Create(createTagModel.Name);
            return Content(tag.Name, "text/plain");
        }

        [HttpDelete("{tagName}")]
        public async Task<IActionResult> DeleteTag(string tagName)
        {
            if (string.IsNullOrWhiteSpace(tagName))
            {
                return BadRequest("Tag name cannot be empty.");
            }

            await _tagService.Delete(tagName);
            return Ok();
        }
    }
}

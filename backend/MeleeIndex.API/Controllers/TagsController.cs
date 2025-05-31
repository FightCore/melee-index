using FluentValidation;
using MeleeIndex.Api.Validators;
using MeleeIndex.Contracts.Tags;
using MeleeIndex.Models;
using MeleeIndex.Services.Tags;
using Microsoft.AspNetCore.Http;
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
        [Produces("text/plain")]
        public async Task<IActionResult> CreateTag([FromBody] CreateTagModel createTagModel)
        {
            var result = await _createTagValidator.ValidateAsync(createTagModel);
            if (!result.IsValid)
            {
                return BadRequest(result.ToDictionary());
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

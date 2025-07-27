using FluentValidation;
using MeleeIndex.Api.Errors;
using MeleeIndex.Contracts.Authors;
using MeleeIndex.Services.Authors;
using MeleeIndex.Services.Exceptions;
using MeleeIndex.Services.Sources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MeleeIndex.Api.Controllers;

[Route("authors")]
[ApiController]
public class AuthorsController(IValidator<CreateAuthorModel> createAuthorValidator, IAuthorService authorService) : ControllerBase
{
    private readonly IValidator<CreateAuthorModel> _createAuthorValidator = createAuthorValidator;
    private readonly IAuthorService _authorService = authorService;

    [HttpPost]
    [Authorize(Policy = "ObjectCreation")]
    public async Task<IActionResult> CreateAuthor([FromBody] CreateAuthorModel author)
    {
        var result = await _createAuthorValidator.ValidateAsync(author);
        if (!result.IsValid)
        {
            return BadRequest(ValidatorApiError.Create(result));
        }

        var createdAuthor = await _authorService.Create(author);

        return Ok(createdAuthor);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSource([FromRoute] Guid id)
    {
        try
        {
            await _authorService.Delete(id);
            return NoContent();
        }
        catch (AuthorIsInUseException)
        {
            return BadRequest();
        }
    }
}

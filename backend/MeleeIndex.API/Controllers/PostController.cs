using FluentValidation;
using MeleeIndex.Api.Errors;
using MeleeIndex.Contracts.Posts;
using MeleeIndex.Services.Posts;
using Microsoft.AspNetCore.Mvc;

namespace MeleeIndex.Api.Controllers;

[Route("posts")]
public class PostController : ControllerBase
{
    private readonly IValidator<CreatePostModel> _createPostValidator;
    private readonly IPostService _postService;
    
    public PostController(IValidator<CreatePostModel> createPostValidator, IPostService postService)
    {
        _createPostValidator = createPostValidator;
        _postService = postService;
    }
    
    [HttpPost]
    public async Task<IActionResult> CreatePost([FromBody] CreatePostModel post)
    {
        var result = await _createPostValidator.ValidateAsync(post);
        if (!result.IsValid)
        {
            return BadRequest(ValidatorApiError.Create(result));
        }
        
        var createdPost = await _postService.Create(post);
        
        return Ok(createdPost);
    }
}
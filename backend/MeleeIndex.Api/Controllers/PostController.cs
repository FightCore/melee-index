using FluentValidation;
using MeleeIndex.Api.Errors;
using MeleeIndex.Contracts.Posts;
using MeleeIndex.Services.Posts;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace MeleeIndex.Api.Controllers;

[Route("posts")]
public class PostController : ControllerBase
{
    private readonly IPostService _postService;

    public PostController(IPostService postService)
    {
        _postService = postService;
    }

    [HttpGet]
    public async Task<IActionResult> GetPosts()
    {
        var posts = await _postService.GetAll();
        var jsonPostData = posts.Select(post => JsonSerializer.Deserialize<JsonElement>(post.PostData));
        return Ok(jsonPostData);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetPost(string id)
    {
        var post = await _postService.GetById(id);

        if (post == null)
        {
            return NotFound();
        }
        
        var jsonPostData = JsonSerializer.Deserialize<JsonElement>(post.PostData);
        return Ok(jsonPostData);
    }
}

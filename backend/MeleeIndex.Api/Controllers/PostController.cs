using MeleeIndex.Services.Posts;
using Microsoft.AspNetCore.Mvc;

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
        var jsonPostData = posts.Select(post => post.PostData);
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
        
        return Ok(post.PostData);
    }
}

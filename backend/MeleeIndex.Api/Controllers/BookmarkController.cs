using MeleeIndex.Services.Posts;
using MeleeIndex.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace MeleeIndex.Api.Controllers;

[ApiController]
[Route("bookmarks")]
[Authorize]
public class BookmarkController : BaseController
{
    private readonly IBookmarkService _bookmarkService;
    private readonly IPostService _postService;

    public BookmarkController(IBookmarkService bookmarkService, IPostService postService)
    {
        _bookmarkService = bookmarkService;
        _postService = postService;
    }

    [HttpGet]
    public async Task<IActionResult> GetBookmarks()
    {
        if (!TryGetUserId(out var userId) || userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var posts = await _bookmarkService.GetPostsByUser(userId);
        var postData = posts.Select(post =>
        {
            var postData = post.PostData;
            postData.AdditionalProperties.Add("bookmarked", JsonSerializer.SerializeToElement(true));
            return postData;
        });
        return Ok(postData);
    }

    [HttpPost("/posts/{documentId}/bookmark")]
    public async Task<IActionResult> CreateBookmark(string documentId)
    {
        if (!TryGetUserId(out var userId) || userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var post = await _postService.GetById(documentId);
        if (post == null)
        {
            return NotFound();
        }

        var bookmark = await _bookmarkService.Create(post.Id, userId);
        return Ok(bookmark);
    }
    
    [HttpDelete(("/posts/{documentId}/bookmark"))]
    public async Task<IActionResult> DeleteBookmark(string documentId)
    {
        if (!TryGetUserId(out var userId) || userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var post = await _postService.GetById(documentId);
        if (post == null)
        {
            return NotFound();
        }

        await _bookmarkService.Remove(post.Id, userId);
        return Ok();
    }
}

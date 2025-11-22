using MeleeIndex.Models.DataEntities;
using System.Net;
using MeleeIndex.Tests.Shared.Fixtures;
using MeleeIndex.Tests.Shared.Utilities;
using System.Net.Http.Json;
using System.Text.Json;

namespace MeleeIndex.Tests.Integration.Controllers;

public class PostControllerTests : IAsyncLifetime
{
    private readonly WebApplicationFixture _fixture = new();

    public Task InitializeAsync()
    {
        return _fixture.InitializeAsync();
    }

    public Task DisposeAsync()
    {
        return _fixture.DisposeAsync();
    }

    [Fact]
    public async Task GetPosts_ShouldReturnOkWithPublishedPosts()
    {
        // Arrange
        var post = TestDataBuilder.CreatePost("Published Post", published: true);
        _fixture.DbContext!.Posts.Add(post);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var response = await _fixture.TestClient.GetAsync("/posts");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var content = await response.Content.ReadAsStringAsync();
        content.Should().NotBeEmpty();
    }

    [Fact]
    public async Task GetPosts_ShouldNotReturnDraftPosts()
    {
        // Arrange
        var publishedPost = TestDataBuilder.CreatePost("Published", published: true);
        var draftPost = TestDataBuilder.CreatePost("Draft", published: false);

        _fixture.DbContext!.Posts.AddRange(publishedPost, draftPost);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var response = await _fixture.TestClient.GetAsync("/posts");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var content = await response.Content.ReadFromJsonAsync<List<PostData>>();
        content.Should().ContainSingle().And.AllBeEquivalentTo(publishedPost.Data);
    }

    [Fact]
    public async Task GetPostById_ShouldReturnOkWhenPostExists()
    {
        // Arrange
        var post = TestDataBuilder.CreatePost(published: true);
        _fixture.DbContext!.Posts.Add(post);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var response = await _fixture.TestClient.GetAsync($"/posts/{post.DocumentId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var content = await response.Content.ReadFromJsonAsync<PostData>();
        content.Should().BeEquivalentTo(post.Data);
    }

    [Fact]
    public async Task GetPostById_ShouldReturnNotFoundWhenPostDoesNotExist()
    {
        // Act
        var response = await _fixture.TestClient.GetAsync($"/posts/{Guid.NewGuid()}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task GetPostById_ShouldReturnNotFoundForDraftPost()
    {
        // Arrange
        var draftPost = TestDataBuilder.CreatePost(published: false);
        _fixture.DbContext!.Posts.Add(draftPost);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var response = await _fixture.TestClient.GetAsync($"/posts/{draftPost.DocumentId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task GetPosts_ShouldReturnEmptyListWhenNoPosts()
    {
        // Act
        var response = await _fixture.TestClient.GetAsync("/posts");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var content = await response.Content.ReadFromJsonAsync<List<PostData>>();
        content.Should().BeEmpty();
    }

    [Fact]
    public async Task GetPosts_ShouldReturnMultiplePublishedPosts()
    {
        // Arrange
        var posts = new[]
        {
            TestDataBuilder.CreatePost("Post 1", published: true),
            TestDataBuilder.CreatePost("Post 2", published: true),
            TestDataBuilder.CreatePost("Post 3", published: true)
        };

        _fixture.DbContext!.Posts.AddRange(posts);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var response = await _fixture.TestClient.GetAsync("/posts");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var content = await response.Content.ReadFromJsonAsync<List<PostData>>();
        content.Should().HaveCount(3);
    }
}

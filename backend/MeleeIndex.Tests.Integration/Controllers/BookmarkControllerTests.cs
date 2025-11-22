using System.Net;
using System.Net.Http.Json;
using MeleeIndex.Tests.Shared.Fixtures;
using MeleeIndex.Tests.Shared.Utilities;

namespace MeleeIndex.Tests.Integration.Controllers;

public class BookmarkControllerTests : IAsyncLifetime
{
    private readonly WebApplicationFixture _fixture = new();
    private const string BookmarkBaseUrl = "/bookmarks";
    private const string PostsBaseUrl = "/posts";

    public Task InitializeAsync()
    {
        return _fixture.InitializeAsync();
    }

    public Task DisposeAsync()
    {
        return _fixture.DisposeAsync();
    }

    [Fact]
    public async Task CreateBookmark_ShouldReturnUnauthorizedWithoutAuth()
    {
        // Arrange
        var postId = Guid.NewGuid();

        // Act
        var response = await _fixture.TestClient.PostAsync($"{PostsBaseUrl}/{postId}/bookmark", null);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
        var content = await response.Content.ReadAsStringAsync();
        content.Should().BeEmpty();
    }

    [Fact]
    public async Task GetBookmarks_ShouldReturnUnauthorizedWithoutAuth()
    {
        // Act
        var response = await _fixture.TestClient.GetAsync(BookmarkBaseUrl);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
        var content = await response.Content.ReadAsStringAsync();
        content.Should().BeEmpty();
    }

    [Fact]
    public async Task DeleteBookmark_ShouldReturnUnauthorizedWithoutAuth()
    {
        // Arrange
        var postId = Guid.NewGuid();

        // Act
        var response = await _fixture.TestClient.DeleteAsync($"{PostsBaseUrl}/{postId}/bookmark");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
        var content = await response.Content.ReadAsStringAsync();
        content.Should().BeEmpty();
    }

    [Fact]
    public async Task CreateBookmark_ShouldReturnUnauthorizedWithInvalidToken()
    {
        // Arrange
        var postId = Guid.NewGuid();
        _fixture.TestClient.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", "invalid-token");

        // Act
        var response = await _fixture.TestClient.PostAsync($"{PostsBaseUrl}/{postId}/bookmark", null);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
        var content = await response.Content.ReadAsStringAsync();
        content.Should().BeEmpty();
    }

    [Fact]
    public async Task DeleteBookmark_ShouldReturnUnauthorizedWithInvalidToken()
    {
        // Arrange
        var postId = Guid.NewGuid();
        _fixture.TestClient.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", "invalid-token");

        // Act
        var response = await _fixture.TestClient.DeleteAsync($"{PostsBaseUrl}/{postId}/bookmark");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
        var content = await response.Content.ReadAsStringAsync();
        content.Should().BeEmpty();
    }

    [Fact]
    public async Task GetBookmarks_ShouldReturnUnauthorizedWithInvalidToken()
    {
        // Arrange
        _fixture.TestClient.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", "invalid-token");

        // Act
        var response = await _fixture.TestClient.GetAsync(BookmarkBaseUrl);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
        var content = await response.Content.ReadAsStringAsync();
        content.Should().BeEmpty();
    }
}

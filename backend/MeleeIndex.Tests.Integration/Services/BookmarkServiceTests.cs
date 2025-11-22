using MeleeIndex.Services.Users;
using MeleeIndex.Tests.Shared.Fixtures;
using MeleeIndex.Tests.Shared.Utilities;
using MeleeIndex.Repositories.Users;
using MeleeIndex.Models;
using Microsoft.Extensions.Caching.Distributed;
using NSubstitute;

namespace MeleeIndex.Tests.Integration.Services;

public class BookmarkServiceTests : IAsyncLifetime
{
    private readonly IndexDbFixture _fixture = new();
    private IBookmarkService? _service;
    private IDistributedCache? _cache;

    public async Task InitializeAsync()
    {
        await _fixture.InitializeAsync();
        _cache = Substitute.For<IDistributedCache>();
        var repository = new BookmarkRepository(_fixture.DbContext!, _cache);
        _service = new BookmarkService(repository);
    }

    public Task DisposeAsync()
    {
        return _fixture.DisposeAsync();
    }

    [Fact]
    public async Task Create_ShouldCreateBookmark()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var postId = Guid.NewGuid();
        var user = TestDataBuilder.CreateUser(id: userId);
        var post = TestDataBuilder.CreatePost(id: postId, published: true);
        _fixture.DbContext!.Users.Add(user);
        _fixture.DbContext!.Posts.Add(post);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var bookmark = await _service!.Create(postId, userId);

        // Assert
        bookmark.Should().NotBeNull();
        bookmark.UserId.Should().Be(userId);
        bookmark.PostId.Should().Be(postId);
    }

    [Fact]
    public async Task Remove_ShouldDeleteBookmark()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var postId = Guid.NewGuid();
        var user = TestDataBuilder.CreateUser(id: userId);
        var post = TestDataBuilder.CreatePost(id: postId);
        _fixture.DbContext!.Users.Add(user);
        _fixture.DbContext!.Posts.Add(post);
        await _fixture.DbContext.SaveChangesAsync();

        var bookmark = TestDataBuilder.CreateBookmark(userId: userId, postId: postId);
        _fixture.DbContext!.Bookmarks.Add(bookmark);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        await _service!.Remove(bookmark.PostId, bookmark.UserId);

        // Assert
        var deletedBookmark = _fixture.DbContext!.Bookmarks.FirstOrDefault(b => b.Id == bookmark.Id);
        deletedBookmark.Should().BeNull();
    }

    [Fact]
    public async Task GetPostsByUser_ShouldReturnUserBookmarks()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var user = TestDataBuilder.CreateUser(id: userId);
        var post1 = TestDataBuilder.CreatePost();
        var post2 = TestDataBuilder.CreatePost();

        _fixture.DbContext!.Users.Add(user);
        _fixture.DbContext!.Posts.AddRange(post1, post2);
        await _fixture.DbContext.SaveChangesAsync();

        var bookmark1 = TestDataBuilder.CreateBookmark(userId: userId, postId: post1.Id);
        var bookmark2 = TestDataBuilder.CreateBookmark(userId: userId, postId: post2.Id);

        _fixture.DbContext.Bookmarks.AddRange(bookmark1, bookmark2);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var result = await _service!.GetPostsByUser(userId);

        // Assert
        result.Should().HaveCount(2);
    }

    [Fact]
    public async Task GetPostsByUser_ShouldReturnEmptyWhenNoBookmarks()
    {
        // Act
        var result = await _service!.GetPostsByUser(Guid.NewGuid());

        // Assert
        result.Should().BeEmpty();
    }
}

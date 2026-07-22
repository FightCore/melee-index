using MeleeIndex.Repositories.Users;
using MeleeIndex.Tests.Shared.Fixtures;
using MeleeIndex.Tests.Shared.Utilities;
using Microsoft.Extensions.Caching.Distributed;

namespace MeleeIndex.Tests.Integration.Repositories;

public class BookmarkRepositoryTests : IAsyncLifetime
{
    private readonly IndexDbFixture _fixture = new();
    private IBookmarkRepository? _repository;
    private IDistributedCache? _cache;

    public async Task InitializeAsync()
    {
        await _fixture.InitializeAsync();
        _cache = Substitute.For<IDistributedCache>();
        _repository = new BookmarkRepository(_fixture.DbContext!, _cache);
    }

    public Task DisposeAsync()
    {
        return _fixture.DisposeAsync();
    }

    [Fact]
    public async Task Create_ShouldAddBookmarkToDatabase()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var postId = Guid.NewGuid();

        var publishedPost = TestDataBuilder.CreatePost(published: true, id: postId);
        var user = TestDataBuilder.CreateUser(id: userId);
        _fixture.DbContext!.Posts.Add(publishedPost);
        _fixture.DbContext!.Users.Add(user);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var result = await _repository!.Create(postId, userId);

        // Assert
        result.Should().NotBeNull();
        result.UserId.Should().Be(userId);
        result.PostId.Should().Be(postId);

        var savedBookmark = _fixture.DbContext!.Bookmarks.FirstOrDefault(b => b.Id == result.Id);
        savedBookmark.Should().NotBeNull();
    }

    [Fact]
    public async Task GetPostsByUser_ShouldReturnOnlyUserPosts()
    {
        // Arrange
        var userId1 = Guid.NewGuid();
        var userId2 = Guid.NewGuid();
        var user1 = TestDataBuilder.CreateUser(id: userId1);
        var user2 = TestDataBuilder.CreateUser(id: userId2);
        var post1 = TestDataBuilder.CreatePost();
        var post2 = TestDataBuilder.CreatePost();
        var post3 = TestDataBuilder.CreatePost();

        _fixture.DbContext!.Users.AddRange(user1, user2);
        _fixture.DbContext!.Posts.AddRange(post1, post2, post3);
        await _fixture.DbContext.SaveChangesAsync();

        var bookmark1 = TestDataBuilder.CreateBookmark(userId: userId1, postId: post1.Id);
        var bookmark2 = TestDataBuilder.CreateBookmark(userId: userId1, postId: post2.Id);
        var bookmark3 = TestDataBuilder.CreateBookmark(userId: userId2, postId: post1.Id);

        _fixture.DbContext.Bookmarks.AddRange(bookmark1, bookmark2, bookmark3);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var result = await _repository!.GetPostsByUser(userId1);

        // Assert
        result.Should().HaveCount(2);
        result.Select(p => p.Id).Should().Contain(post1.Id).And.Contain(post2.Id);
    }

    [Fact]
    public async Task GetPostsByUser_ShouldReturnEmptyListWhenUserHasNoBookmarks()
    {
        // Act
        var result = await _repository!.GetPostsByUser(Guid.NewGuid());

        // Assert
        result.Should().BeEmpty();
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
        await _repository!.Remove(bookmark.PostId, bookmark.UserId);

        // Assert
        var deletedBookmark = _fixture.DbContext!.Bookmarks.FirstOrDefault(b => b.Id == bookmark.Id);
        deletedBookmark.Should().BeNull();
    }

    [Fact]
    public async Task Create_ShouldSetTimestamps()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var postId = Guid.NewGuid();
        var user = TestDataBuilder.CreateUser(id: userId);
        var post = TestDataBuilder.CreatePost(id: postId, published: true);
        _fixture.DbContext!.Users.Add(user);
        _fixture.DbContext!.Posts.Add(post);
        await _fixture.DbContext.SaveChangesAsync();

        var beforeTime = DateTime.UtcNow;

        // Act
        var result = await _repository!.Create(postId, userId);
        var afterTime = DateTime.UtcNow;

        // Assert
        result.CreatedAt.Should().BeOnOrAfter(beforeTime).And.BeOnOrBefore(afterTime);
    }
}

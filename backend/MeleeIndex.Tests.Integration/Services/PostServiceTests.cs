using MeleeIndex.Tests.Shared.Fixtures;
using MeleeIndex.Tests.Shared.Utilities;
using MeleeIndex.Services.Posts;
using MeleeIndex.Repositories.Posts;

namespace MeleeIndex.Tests.Integration.Services;

public class PostServiceTests : IAsyncLifetime
{
    private readonly IndexDbFixture _fixture = new();
    private IPostService? _service;

    public async Task InitializeAsync()
    {
        await _fixture.InitializeAsync();
        var repository = new PostRepository(_fixture.DbContext!);
        _service = new PostService(_fixture.DbContext!, repository);
    }

    public Task DisposeAsync()
    {
        return _fixture.DisposeAsync();
    }

    [Fact]
    public async Task GetAll_ShouldReturnAllPublishedPosts()
    {
        // Arrange
        var posts = new[]
        {
            TestDataBuilder.CreatePost(title: "Published 1", published: true),
            TestDataBuilder.CreatePost(title: "Published 2", published: true),
            TestDataBuilder.CreatePost(published: false)
        };

        _fixture.DbContext!.Posts.AddRange(posts);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var result = await _service!.GetAll();

        // Assert
        result.Should().HaveCount(2);
    }

    [Fact]
    public async Task GetById_ShouldReturnPostWhenPublished()
    {
        // Arrange
        var post = TestDataBuilder.CreatePost(published: true);
        _fixture.DbContext!.Posts.Add(post);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var result = await _service!.GetById(post.DocumentId.ToString());

        // Assert
        result.Should().NotBeNull();
        result!.DocumentId.Should().Be(post.DocumentId);
    }

    [Fact]
    public async Task GetById_ShouldReturnNullWhenDraft()
    {
        // Arrange
        var post = TestDataBuilder.CreatePost(published: false);
        _fixture.DbContext!.Posts.Add(post);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var result = await _service!.GetById(post.DocumentId.ToString());

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task GetById_ShouldReturnNullWhenNotFound()
    {
        // Act
        var result = await _service!.GetById(Guid.NewGuid().ToString());

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task GetAll_ShouldReturnEmptyListWhenNoPosts()
    {
        // Act
        var result = await _service!.GetAll();

        // Assert
        result.Should().BeEmpty();
    }

    [Fact]
    public async Task GetAll_ShouldReturnEmptyListWhenOnlyDrafts()
    {
        // Arrange
        var drafts = new[]
        {
            TestDataBuilder.CreatePost(published: false),
            TestDataBuilder.CreatePost(published: false)
        };

        _fixture.DbContext!.Posts.AddRange(drafts);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var result = await _service!.GetAll();

        // Assert
        result.Should().BeEmpty();
    }
}

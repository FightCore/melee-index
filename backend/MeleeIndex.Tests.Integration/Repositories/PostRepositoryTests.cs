using MeleeIndex.Repositories.Posts;
using MeleeIndex.Tests.Shared.Fixtures;
using MeleeIndex.Tests.Shared.Utilities;

namespace MeleeIndex.Tests.Integration.Repositories;

public class PostRepositoryTests : IAsyncLifetime
{
    private readonly IndexDbFixture _fixture = new();
    private IPostRepository? _repository;

    public async Task InitializeAsync()
    {
        await _fixture.InitializeAsync();
        _repository = new PostRepository(_fixture.DbContext!);
    }

    public Task DisposeAsync()
    {
        return _fixture.DisposeAsync();
    }

    [Fact]
    public async Task GetAll_ShouldReturnOnlyPublishedPosts()
    {
        // Arrange
        var publishedPost = TestDataBuilder.CreatePost(published: true);
        var unpublishedPost = TestDataBuilder.CreatePost(published: false);

        _fixture.DbContext!.Posts.AddRange(publishedPost, unpublishedPost);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var result = await _repository!.GetAll();

        // Assert
        result.Should().HaveCount(1);
        result.First().Id.Should().Be(publishedPost.Id);
    }

    [Fact]
    public async Task GetAll_ShouldReturnEmptyListWhenNoPosts()
    {
        // Act
        var result = await _repository!.GetAll();

        // Assert
        result.Should().BeEmpty();
    }

    [Fact]
    public async Task GetById_ShouldReturnPostWhenExists()
    {
        // Arrange
        var post = TestDataBuilder.CreatePost();
        _fixture.DbContext!.Posts.Add(post);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var result = await _repository!.GetById(post.DocumentId.ToString());

        // Assert
        result.Should().NotBeNull();
        result!.Id.Should().Be(post.Id);
        result.DocumentId.Should().Be(post.DocumentId);
    }

    [Fact]
    public async Task GetById_ShouldReturnNullWhenPostDoesNotExist()
    {
        // Act
        var result = await _repository!.GetById(Guid.NewGuid().ToString());

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task GetById_ShouldReturnNullForUnpublishedPost()
    {
        // Arrange
        var unpublishedPost = TestDataBuilder.CreatePost(published: false);
        _fixture.DbContext!.Posts.Add(unpublishedPost);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var result = await _repository!.GetById(unpublishedPost.DocumentId.ToString());

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task GetAll_ShouldReturnMultiplePublishedPosts()
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
        var result = await _repository!.GetAll();

        // Assert
        result.Should().HaveCount(3);
        result.Should().AllSatisfy(p => p.PublishedAt.Should().NotBeNull());
    }
}

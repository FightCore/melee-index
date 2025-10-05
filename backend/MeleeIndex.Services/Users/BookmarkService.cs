using MeleeIndex.Models;
using MeleeIndex.Models.Users;
using MeleeIndex.Repositories.Users;

namespace MeleeIndex.Services.Users;


public interface IBookmarkService
{
    Task<List<Post>> GetPostsByUser(Guid userId, CancellationToken cancellationToken = default);

    Task<Bookmark> Create(Guid postId, Guid userId, CancellationToken cancellationToken = default);

    Task Remove(Guid postId, Guid userId, CancellationToken cancellationToken = default);
}

public class BookmarkService : IBookmarkService
{
    private readonly IBookmarkRepository _bookmarkRepository;

    public BookmarkService(IBookmarkRepository bookmarkRepository)
    {
        _bookmarkRepository = bookmarkRepository;
    }

    public Task<List<Post>> GetPostsByUser(Guid userId, CancellationToken cancellationToken = default)
    {
        return _bookmarkRepository.GetPostsByUser(userId, cancellationToken);
    }

    public Task<Bookmark> Create(Guid postId, Guid userId, CancellationToken cancellationToken = default)
    {
        return _bookmarkRepository.Create(postId, userId, cancellationToken);
    }

    public Task Remove(Guid postId, Guid userId, CancellationToken cancellationToken = default)
    {
        return _bookmarkRepository.Remove(postId, userId, cancellationToken);
    }
}

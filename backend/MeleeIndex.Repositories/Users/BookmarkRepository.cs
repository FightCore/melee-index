using MeleeIndex.DAL;
using MeleeIndex.Models;
using MeleeIndex.Models.Users;
using MeleeIndex.Utilities.CacheKeys;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace MeleeIndex.Repositories.Users;

public interface IBookmarkRepository
{
    Task<List<Post>> GetPostsByUser(Guid userId, CancellationToken cancellationToken = default);

    Task<Bookmark> Create(Guid postId, Guid userId, CancellationToken cancellationToken = default);

    Task Remove(Guid postId, Guid userId, CancellationToken cancellationToken = default);
}

public class BookmarkRepository : IBookmarkRepository
{
    private readonly DbSet<Bookmark> _dbSet;
    private readonly IDistributedCache _distributedCache;
    private readonly IndexDbContext _dbContext;

    public BookmarkRepository(IndexDbContext dbContext, IDistributedCache distributedCache)
    {
        _dbSet = dbContext.Bookmarks;
        _distributedCache = distributedCache;
        _dbContext = dbContext;
    }
    
    public async Task<List<Post>> GetPostsByUser(Guid userId, CancellationToken cancellationToken = default)
    {
        var cacheKey = BookmarkCacheKeys.GetListCacheKey(userId);
        var cachedValue = await _distributedCache.GetStringAsync(cacheKey, cancellationToken);
        if (!string.IsNullOrWhiteSpace(cachedValue))
        {
            return JsonSerializer.Deserialize<List<Post>>(cachedValue)!;
        }
        var dbValue = await _dbSet.Where(bookmark => bookmark.UserId == userId).Select(bookmark => bookmark.Post).ToListAsync(cancellationToken);
        
        await _distributedCache.SetStringAsync(cacheKey, JsonSerializer.Serialize(dbValue), cancellationToken);
        return dbValue;
    }

    public async Task<Bookmark> Create(Guid postId, Guid userId, CancellationToken cancellationToken = default)
    {
        var bookmark = new Bookmark
        {
            PostId = postId, UserId = userId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        _dbSet.Add(bookmark);
        await _dbContext.SaveChangesAsync(cancellationToken);
        await InvalidateBookmarkCaches(userId);
        return bookmark;
    }

    public async Task Remove(Guid postId, Guid userId, CancellationToken cancellationToken = default)
    {
        await _dbSet.Where(bookmark => bookmark.PostId == postId && bookmark.UserId == userId).ExecuteDeleteAsync(cancellationToken);
        await InvalidateBookmarkCaches(userId);
    }

    private async Task InvalidateBookmarkCaches(Guid userId)
    {
        List<string> cacheKeys =
        [
            BookmarkCacheKeys.GetIdListCacheKey(userId),
            BookmarkCacheKeys.GetListCacheKey(userId)
        ];

        foreach (var cacheKey in cacheKeys)
        {
            await _distributedCache.RemoveAsync(cacheKey);
        }
    }
}

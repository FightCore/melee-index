using HotChocolate.AspNetCore;
using HotChocolate.Execution;
using MeleeIndex.DAL;
using MeleeIndex.Utilities.CacheKeys;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;

namespace MeleeIndex.GraphQL.Middleware;

public class UserIdHttpInterceptor : DefaultHttpRequestInterceptor
{
    public override async ValueTask OnCreateAsync(HttpContext context,
        IRequestExecutor requestExecutor, OperationRequestBuilder requestBuilder,
        CancellationToken cancellationToken)
    {
        var idClaim = context.User.Claims.FirstOrDefault(claim => claim.Type is JwtRegisteredClaimNames.Sub or ClaimTypes.NameIdentifier);
        if (idClaim != null && Guid.TryParse(idClaim.Value, out var userId))
        {
            requestBuilder.AddGlobalState("UserId", userId);
            requestBuilder.AddGlobalState("Bookmarks", await GetBookmarks(context, userId, cancellationToken));
        }

        await base.OnCreateAsync(context, requestExecutor, requestBuilder,
            cancellationToken);
    }

    private async Task<List<string>> GetBookmarks(HttpContext context, Guid userId, CancellationToken cancellationToken)
    {
        var distributedCache = context.RequestServices.GetRequiredService<IDistributedCache>();
        
        var ids = await distributedCache.GetStringAsync(BookmarkCacheKeys.GetIdListCacheKey(userId), cancellationToken);
        if (ids != null)
        {
            return JsonSerializer.Deserialize<List<string>>(ids)!;
        }
        
        var dbContextFactory = context.RequestServices.GetRequiredService<IDbContextFactory<IndexDbContext>>();
        await using var dbContext = await dbContextFactory.CreateDbContextAsync(cancellationToken);
        var bookmarks = await dbContext.Bookmarks.Where(bookmark => bookmark.UserId == userId).Select(bookmark => bookmark.Post.DocumentId).ToListAsync(cancellationToken);
        
        await distributedCache.SetStringAsync(BookmarkCacheKeys.GetIdListCacheKey(userId), JsonSerializer.Serialize(bookmarks), cancellationToken);
        return bookmarks;
    }
}

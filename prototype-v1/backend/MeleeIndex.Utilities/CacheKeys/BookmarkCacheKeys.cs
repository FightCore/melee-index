namespace MeleeIndex.Utilities.CacheKeys;

public static class BookmarkCacheKeys
{
    public static string GetListCacheKey(Guid userId)
    {
        return $"Bookmarks:{userId}";
    }

    public static string GetIdListCacheKey(Guid userId)
    {
        return $"BookmarkIds:{userId}";
    }
}

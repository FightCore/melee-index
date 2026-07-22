using MeleeIndex.DAL;
using MeleeIndex.Models.DataEntities;

namespace MeleeIndex.GraphQL.Types;

[ExtendObjectType(typeof(PostData))]
public class PostResolver
{
    public bool GetBookmarked([Parent] PostData post, [GlobalState("Bookmarks")] List<string>? bookmarks)
    {
        if (bookmarks == null || bookmarks.Count == 0)
        {
            return false;
        }
        return bookmarks.Contains(post.DocumentId);
    }
}

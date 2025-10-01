using MeleeIndex.DAL;
using MeleeIndex.Models.Posts;

namespace MeleeIndex.GraphQL.Types;

[QueryType]
public class Query
{
    [UseOffsetPaging]
    [UseFiltering]
    [UseSorting]
    public IQueryable<PostData> GetPosts(IndexDbContext dbContext) =>
        dbContext.Posts.Select(post => post.PostData);
}

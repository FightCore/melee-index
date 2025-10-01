using MeleeIndex.DAL;
using MeleeIndex.Models.Posts;

namespace MeleeIndex.GraphQL.Types;

[QueryType]
public class Query
{
    [UseOffsetPaging]
    [UseFiltering]
    [UseSorting]
    public IQueryable<PostData> GetProducts(IndexDbContext dbContext) =>
        dbContext.Posts.Select(post => post.PostData);
}

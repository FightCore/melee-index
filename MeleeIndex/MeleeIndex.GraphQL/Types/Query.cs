using MeleeIndex.Data;
using MeleeIndex.Models;

namespace MeleeIndex.GraphQL.Types;

[QueryType]
public static partial class Query
{
    [UsePaging]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Link> GetPosts(MeleeIndexDbContext dbContext)
    {
        return dbContext.Links;
    }
}
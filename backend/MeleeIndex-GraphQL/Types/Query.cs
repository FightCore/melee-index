using MeleeIndex.Contracts.Posts;
using MeleeIndex.DAL;
using MeleeIndex.GraphQL.Mapper;
using MeleeIndex.Models.Posts;

namespace MeleeIndex.GraphQL.Types;

[QueryType]
public class Query
{
    [UseOffsetPaging]
    public IQueryable<PostModel> GetProducts(IndexDbContext dbContext) =>
        dbContext.Posts.Select(post => PostDataMapper.Convert(post.PostData));
}

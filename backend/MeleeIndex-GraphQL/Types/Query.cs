using MeleeIndex.DAL;
using MeleeIndex.Models.DataEntities;

namespace MeleeIndex.GraphQL.Types;

[QueryType]
public class Query
{
    [UseOffsetPaging]
    [UseFiltering]
    [UseSorting]
    public IQueryable<PostData> GetPosts(IndexDbContext dbContext)
    {
        return dbContext.Posts.Select(post => post.Data);
    }

    public IQueryable<CharacterData> GetCharacters(IndexDbContext dbContext)
    {
        return dbContext.Characters.Select(character => character.Data);
    }

    public IQueryable<CategoryData> GetCategories(IndexDbContext dbContext)
    {
        return dbContext.Categories.Select(category => category.Data);
    }

    public IQueryable<AuthorData> GetAuthors(IndexDbContext dbContext)
    {
        return dbContext.Authors.Select(author => author.Data);
    }
}

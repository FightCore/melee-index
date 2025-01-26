using MeleeIndex.Contracts;
using MeleeIndex.DAL;
using Microsoft.EntityFrameworkCore;

namespace MeleeIndex.GraphQL.Types
{
    [QueryType]
    public class Query
    {
        [UsePaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<PostModel> GetPosts(IndexDbContext dbContext)
        {
            return dbContext.Posts.Include(post => post.Author).Include(post => post.Tags).Include(post => post.Source).Select(post =>
            (
                new PostModel
                {
                    Id = post.Id,
                    CreatedAt = post.CreatedAt,
                    Summary = post.Summary,
                    Url = post.Url,
                    Title = post.Title,
                    UpdatedAt = post.UpdatedAt,
                    Tags = post.Tags.Select(tag => tag.Name),
                    Author = new AuthorModel
                    {
                        Name = post.Author.Name,
                        Image = post.Author.Image == null ? null : post.Author.Image.Url.ToString()
                    },
                    Source = new SourceModel
                    {
                        Id = post.Source.Id,
                        Name = post.Source.Name,
                        Description = post.Source.Description,
                        Url = post.Source.Url,
                    }
                }
            ));
        }

        public List<string> GetTags(IndexDbContext dbContext)
        {
            return dbContext.Tags.Select(tags => tags.Name).ToList();
        }
    }
}

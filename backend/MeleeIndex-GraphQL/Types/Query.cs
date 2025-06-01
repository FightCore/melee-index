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
                    Category = new CategoryModel()
                    {
                        Name = post.Category.Name,
                        Color = post.Category.Color
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

        public List<SourceModel> GetSources(IndexDbContext dbContext)
        {
            return dbContext.Sources.Select(source => new SourceModel()
            {
                Description = source.Description,
                Name = source.Name,
                Url = source.Url,
                Id = source.Id

            }).ToList();
        }

        public List<AuthorModel> GetAuthors(IndexDbContext dbContext)
        {
            return dbContext.Authors.Select(author => new AuthorModel()
            {
                Id = author.Id,
                Image = author.Image.Url.ToString(),
                Name = author.Name
            }).ToList();
        }

        public List<CategoryModel> GetCategories(IndexDbContext dbContext)
        {
            return dbContext.Categories.Select(category => new CategoryModel()
            {
                Id = category.Id,
                Name = category.Name,
                Color = category.Color,
            }).ToList();
        }
    }
}

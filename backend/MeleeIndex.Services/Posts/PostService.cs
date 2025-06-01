using MeleeIndex.Contracts.Posts;
using MeleeIndex.DAL;
using MeleeIndex.Models;
using Microsoft.EntityFrameworkCore;

namespace MeleeIndex.Services.Posts;

public interface IPostService
{
    public Task<Post> Create(CreatePostModel model);
}

internal class PostService : IPostService
{
    // TODO: Figure out if we want to use repositories rather than direct accessing the context.
    private readonly IndexDbContext _dbContext;

    public PostService(IndexDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Post> Create(CreatePostModel model)
    {
        var post = new Post
        {
            CreatedAt = model.Created,
            UpdatedAt = model.Modified,
            Title = model.Title,
            Summary = model.Summary,
            Url = new Uri(model.Url),
            Author = await GetOrCreateAuthor(model.Author),
            Category = await GetOrCreateCategory(model.Category),
            Submitter = await GetSubmitter(),
            Source = await GetOrCreateSource(model.Source),
            Tags = await GetOrCreateTags(model.Tags),
            Image = null
        };
        
        _dbContext.Posts.Update(post);
        await _dbContext.SaveChangesAsync();
        
        return post;
    }

    private async Task<Author> GetOrCreateAuthor(string authorName)
    {
        var author = await _dbContext.Authors.FirstOrDefaultAsync(author =>
            author.Name == authorName);
        if (author == null)
        {
            throw new Exception();
        }

        return author;
    }

    private async Task<Source> GetOrCreateSource(string sourceName)
    {
        var source = await _dbContext.Sources.FirstOrDefaultAsync(source => source.Name == sourceName);
        if (source == null)
        {
            throw new Exception();
        }
        
        return source;
    }

    private async Task<List<Tag>> GetOrCreateTags(List<string> tagsNames)
    {
        var normalizedTagsNames = tagsNames.Select(tag => tag.ToLowerInvariant()).ToList();
        var tags = await _dbContext.Tags.Where(tag => normalizedTagsNames.Contains(tag.Name)).ToListAsync();

        return tags;
    }

    private async Task<Category> GetOrCreateCategory(string categoryName)
    {
        var category = await _dbContext.Categories.FirstOrDefaultAsync(category => category.Name == categoryName);
        if (category == null)
        {
            throw new Exception();
        }

        return category;
    }

    private async Task<Submitter> GetSubmitter(string submitterName = null)
    {
        if (string.IsNullOrWhiteSpace(submitterName))
        {
            return await _dbContext.Submitters.FirstOrDefaultAsync();
        }

        var submitter = await _dbContext.Submitters.FirstOrDefaultAsync(submitter => submitter.Name == submitterName);
        if (submitter == null)
        {
            throw new Exception();
        }

        return submitter;
    }
}
using MeleeIndex.Contracts.Authors;
using MeleeIndex.DAL;
using MeleeIndex.Models;
using MeleeIndex.Services.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace MeleeIndex.Services.Authors;

public interface IAuthorService
{
    Task<Author> Create(CreateAuthorModel model);

    Task Delete(Guid id);
}

internal class AuthorService(IndexDbContext dbContext) : IAuthorService
{
    private readonly IndexDbContext _dbContext = dbContext;

    public async Task<Author> Create(CreateAuthorModel model)
    {
        var post = Convert(model);
        _dbContext.Authors.Add(post);
        await _dbContext.SaveChangesAsync();
        return post;
    }

    public async Task Delete(Guid id)
    {
        var isAuthorInUse = await _dbContext.Posts.AnyAsync(p => p.Author.Id == id);
        if (isAuthorInUse)
        {
            throw new AuthorIsInUseException();
        }

        await _dbContext.Authors.Where(author => author.Id == id).ExecuteDeleteAsync();
    }

    private static Author Convert(CreateAuthorModel model)
    {
        return new Author
        {
            Name = model.Name,
            BlueSky = model.BlueSky,
            Twitch = model.Twitch,
            YouTube = model.YouTube,
            Image = new Image
            {
                Url = new Uri(model.ImageUrl)
            },
        };
    }
}

using MeleeIndex.DAL;
using MeleeIndex.Models;
using MeleeIndex.Services.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace MeleeIndex.Services.Tags;

public interface ITagService
{
    Task<Tag> Create(string name);

    Task Delete(string name);
}
internal class TagService(IndexDbContext dbContext) : ITagService
{
    private readonly IndexDbContext _dbContext = dbContext;

    public async Task<Tag> Create(string name)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);

        if (await _dbContext.Tags.AnyAsync(tag => tag.Name == name))
        {
            throw new DuplicateEntityException();
        }


        var tag = new Tag
        {
            Name = name
        };

        _dbContext.Tags.Add(tag);
        await _dbContext.SaveChangesAsync();
        return tag;
    }

    public async Task Delete(string name)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);

        if (await _dbContext.Posts.AnyAsync(post => post.Tags.Any(tag => tag.Name == name)))
        {
            throw new EntityInUseException();
        }

        await _dbContext.Tags
            .Where(tag => tag.Name == name)
            .ExecuteDeleteAsync();
    }
}

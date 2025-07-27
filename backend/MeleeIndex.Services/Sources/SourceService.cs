using MeleeIndex.Contracts.Sources;
using MeleeIndex.DAL;
using MeleeIndex.Models;
using MeleeIndex.Services.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace MeleeIndex.Services.Sources;

public interface ISourceService
{
    Task<Source> Create(CreateSourceModel model);

    Task Delete(Guid id);
}
internal class SourceService(IndexDbContext dbContext) : ISourceService
{
    private readonly IndexDbContext _dbContext = dbContext;

    public async Task<Source> Create(CreateSourceModel model)
    {
        var source = Convert(model);
        _dbContext.Sources.Add(source);
        await _dbContext.SaveChangesAsync();

        return source;
    }

    public async Task Delete(Guid id)
    {
        var isSourceInUse = await _dbContext.Posts.AnyAsync(p => p.SourceId == id);
        if (isSourceInUse)
        {
            throw new SourceIsInUseException();
        }

        await _dbContext.Sources.Where(source => source.Id == id).ExecuteDeleteAsync();
    }

    private static Source Convert(CreateSourceModel model)
    {
        return new Source
        {
            Name = model.Name,
            Description = model.Description,
            Url = new Uri(model.Url),
        };
    }
}

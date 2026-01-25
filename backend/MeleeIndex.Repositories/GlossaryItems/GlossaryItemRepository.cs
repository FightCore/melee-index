using MeleeIndex.DAL;
using MeleeIndex.Models;
using Microsoft.EntityFrameworkCore;

namespace MeleeIndex.Repositories.GlossaryItems;

public interface IGlossaryItemRepository
{
    Task<GlossaryItem?> Get(string id);
}

internal class GlossaryItemRepository : IGlossaryItemRepository
{
    private DbSet<GlossaryItem> _dbSet;

    public GlossaryItemRepository(IndexDbContext context)
    {
        _dbSet = context.GlossaryItems;
    }
    
    public Task<GlossaryItem?> Get(string id)
    {
        return _dbSet.FirstOrDefaultAsync(glossaryItem => glossaryItem.DocumentId == id);
    }
}

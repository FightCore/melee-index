using MeleeIndex.Models;
using MeleeIndex.Repositories.GlossaryItems;

namespace MeleeIndex.Services.GlossaryItems;

public interface IGlossaryItemService
{
    Task<GlossaryItem?> Get(string id);
}

internal class GlossaryItemService : IGlossaryItemService
{
    private readonly IGlossaryItemRepository _glossaryItemRepository;

    public GlossaryItemService(IGlossaryItemRepository glossaryItemRepository)
    {
        _glossaryItemRepository = glossaryItemRepository;
    }
    
    public Task<GlossaryItem?> Get(string id)
    {
        return _glossaryItemRepository.Get(id);
    }
}

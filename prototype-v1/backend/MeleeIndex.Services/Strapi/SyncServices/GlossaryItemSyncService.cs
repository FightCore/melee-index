using MeleeIndex.DAL;
using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Repositories.Strapi;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Services.Mappers;
using Microsoft.Extensions.Logging;

namespace MeleeIndex.Services.Strapi.SyncServices;

public class GlossaryItemSyncService : SyncService<GlossaryItem, StrapiGlossaryItem, GlossaryItemData>
{
    public GlossaryItemSyncService(ILogger<SyncService<GlossaryItem, StrapiGlossaryItem, GlossaryItemData>> logger, IStrapiGlossaryItemRepository strapiRepository, IndexDbContext dbContext) : base(logger, strapiRepository, dbContext)
    {
    }

    protected override GlossaryItem Convert(StrapiGlossaryItem strapiDocument)
    {
        return GlossaryItemMapper.Convert(strapiDocument);
    }
}

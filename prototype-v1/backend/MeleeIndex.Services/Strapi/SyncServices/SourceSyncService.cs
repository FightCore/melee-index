using MeleeIndex.DAL;
using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Repositories.Strapi;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Utilities;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace MeleeIndex.Services.Strapi.SyncServices;

public class SourceSyncService : SyncService<Source, StrapiSource, SourceData>
{
    public SourceSyncService(ILogger<SyncService<Source, StrapiSource, SourceData>> logger, IStrapiSourceRepository strapiRepository, IndexDbContext dbContext)
        : base(logger, strapiRepository, dbContext)
    {
    }

    protected override Source Convert(StrapiSource strapiDocument)
    {
        return new Source()
        {
            StrapiId = strapiDocument.Id,
            DocumentId = strapiDocument.DocumentId,
            CreatedAt = strapiDocument.CreatedAt,
            UpdatedAt = strapiDocument.UpdatedAt,
            PublishedAt = strapiDocument.PublishedAt,
            Data = JsonSerializer.Deserialize<SourceData>(JsonSerializer.Serialize(strapiDocument,
                SerializationOptions.CamelCase))!
        };
    }
}

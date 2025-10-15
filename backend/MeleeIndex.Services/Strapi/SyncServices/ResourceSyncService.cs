using MeleeIndex.DAL;
using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Repositories.Strapi;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Utilities;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace MeleeIndex.Services.Strapi.SyncServices;

public class ResourceSyncService : SyncService<Resource, StrapiResource, ResourceData>
{
    public ResourceSyncService(ILogger<SyncService<Resource, StrapiResource, ResourceData>> logger, IStrapiResourceRepository strapiRepository, IndexDbContext dbContext)
        : base(logger, strapiRepository, dbContext)
    {
    }

    protected override Resource Convert(StrapiResource strapiDocument)
    {
        return new Resource()
        {
            StrapiId = strapiDocument.Id,
            DocumentId = strapiDocument.DocumentId,
            CreatedAt = strapiDocument.CreatedAt,
            UpdatedAt = strapiDocument.UpdatedAt,
            PublishedAt = strapiDocument.PublishedAt,
            Data = JsonSerializer.Deserialize<ResourceData>(JsonSerializer.Serialize(strapiDocument,
                SerializationOptions.CamelCase))!
        };
    }
}

using MeleeIndex.DAL;
using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Repositories.Strapi;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Services.Mappers;
using Microsoft.Extensions.Logging;

namespace MeleeIndex.Services.Strapi.SyncServices;

public class AuthorSyncService : SyncService<Author, StrapiAuthor, AuthorData>
{
    public AuthorSyncService(IStrapiAuthorRepository strapiAuthorRepository, IndexDbContext dbContext,
        ILogger<AuthorSyncService> logger) : base(logger, strapiAuthorRepository, dbContext)
    {
    }

    protected override Author Convert(StrapiAuthor strapiDocument)
    {
        return AuthorMapper.Convert(strapiDocument);
    }
}

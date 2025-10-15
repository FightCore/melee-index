using MeleeIndex.DAL;
using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Repositories.Posts;
using MeleeIndex.Repositories.Strapi;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Services.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace MeleeIndex.Services.Strapi.SyncServices;

public class CharacterSyncService : SyncService<Character, StrapiCharacter, CharacterData>
{
    public CharacterSyncService(IStrapiCharacterRepository strapiAuthorRepository,
        IndexDbContext dbContext, ILogger<CharacterSyncService> logger) : base(logger, strapiAuthorRepository, dbContext)
    {
    }

    protected override Character Convert(StrapiCharacter strapiDocument)
    {
        return CharacterMapper.Convert(strapiDocument);
    }
}

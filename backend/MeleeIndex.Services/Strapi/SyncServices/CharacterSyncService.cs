using MeleeIndex.DAL;
using MeleeIndex.Repositories.Posts;
using MeleeIndex.Repositories.Strapi;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Services.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace MeleeIndex.Services.Strapi;

public class CharacterSyncService : IEntitySyncService
{
    private readonly IStrapiCharacterRepository _strapiAuthorRepository;
    private readonly IndexDbContext _dbContext;
    private readonly ILogger<CharacterSyncService> _logger;

    public CharacterSyncService(IStrapiCharacterRepository strapiAuthorRepository, IPostRepository postRepository,
        IndexDbContext dbContext, ILogger<CharacterSyncService> logger)
    {
        _strapiAuthorRepository = strapiAuthorRepository;
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task Execute(CancellationToken cancellationToken = default)
    {
        List<StrapiCharacter> strapiCharacters = [];
        for (var page = 0; page < int.MaxValue; page++)
        {
            var currentPage = await _strapiAuthorRepository.Get(page, 50, cancellationToken);

            if (currentPage == null)
            {
                continue;
            }

            strapiCharacters.AddRange(currentPage.Data);

            // There is no more page to collect
            if (currentPage.Meta.Pagination.PageCount < 50)
            {
                break;
            }
        }

        var characters = await _dbContext.Characters.ToListAsync(cancellationToken);

        var toBeDeleted = characters.Where(author => strapiCharacters.All(strapiAuthor => strapiAuthor.DocumentId != author.DocumentId)).ToList();
        var numberAdded = 0;
        var numberUpdated = 0;

        foreach (var strapiCharacter in strapiCharacters)
        {
            var character = CharacterMapper.Convert(strapiCharacter);

            var existing = characters.FirstOrDefault(existingPost => existingPost.DocumentId == strapiCharacter.DocumentId);

            if (existing == null)
            {
                _dbContext.Characters.Add(character);
                numberAdded++;
            }
            else
            {
                existing.CharacterData = character.CharacterData;
                existing.UpdatedAt = character.UpdatedAt;
                _dbContext.Characters.Update(existing);
                numberUpdated++;
            }
        }
        
        _dbContext.Characters.RemoveRange(toBeDeleted);

        await _dbContext.SaveChangesAsync(cancellationToken);
        
        _logger.LogInformation("Removed {NumberOfPostsRemoved} authors, added {NumberOfPostsAdded} authors, updated {NumberOfPostsUpdated} authors", toBeDeleted.Count, numberAdded, numberUpdated);
    }
}

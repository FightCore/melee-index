using MeleeIndex.DAL;
using MeleeIndex.Repositories.Posts;
using MeleeIndex.Repositories.Strapi;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Services.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace MeleeIndex.Services.Strapi;

public class AuthorSyncService : IEntitySyncService
{
    private readonly IStrapiAuthorRepository _strapiAuthorRepository;
    private readonly IndexDbContext _dbContext;
    private readonly ILogger<AuthorSyncService> _logger;

    public AuthorSyncService(IStrapiAuthorRepository strapiAuthorRepository, IPostRepository postRepository,
        IndexDbContext dbContext, ILogger<AuthorSyncService> logger)
    {
        _strapiAuthorRepository = strapiAuthorRepository;
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task Execute(CancellationToken cancellationToken = default)
    {
        List<StrapiAuthor> strapiAuthors = [];
        for (var page = 0; page < int.MaxValue; page++)
        {
            var currentPage = await _strapiAuthorRepository.Get(page, 50, cancellationToken);

            if (currentPage == null)
            {
                continue;
            }

            strapiAuthors.AddRange(currentPage.Data);

            // There is no more page to collect
            if (currentPage.Meta.Pagination.PageCount < 50)
            {
                break;
            }
        }

        var authors = await _dbContext.Authors.ToListAsync(cancellationToken);

        var toBeDeleted = authors.Where(author => strapiAuthors.All(strapiAuthor => strapiAuthor.DocumentId != author.DocumentId)).ToList();
        var numberAdded = 0;
        var numberUpdated = 0;

        foreach (var strapiAuthor in strapiAuthors)
        {
            var author = AuthorMapper.Convert(strapiAuthor);

            var existing = authors.FirstOrDefault(existingPost => existingPost.DocumentId == strapiAuthor.DocumentId);

            if (existing == null)
            {
                _dbContext.Authors.Add(author);
                numberAdded++;
            }
            else
            {
                existing.AuthorData = author.AuthorData;
                existing.UpdatedAt = author.UpdatedAt;
                _dbContext.Authors.Update(existing);
                numberUpdated++;
            }
        }
        
        _dbContext.Authors.RemoveRange(toBeDeleted);

        await _dbContext.SaveChangesAsync(cancellationToken);
        
        _logger.LogInformation("Removed {NumberOfPostsRemoved} authors, added {NumberOfPostsAdded} authors, updated {NumberOfPostsUpdated} authors", toBeDeleted.Count, numberAdded, numberUpdated);
    }
}

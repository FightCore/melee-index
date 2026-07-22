using MeleeIndex.DAL;
using MeleeIndex.Models.Abstract;
using MeleeIndex.Models.Serialization;
using MeleeIndex.Repositories.Strapi;
using MeleeIndex.Repositories.Strapi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace MeleeIndex.Services.Strapi.SyncServices;

public abstract class SyncService<TEntity, TStrapiObject, TData> : IEntitySyncService
    where TEntity : DocumentEntity<TData>
    where TStrapiObject: StrapiDocument
    where TData : JsonExtendableData
{
    private readonly IndexDbContext _dbContext;
    private readonly DbSet<TEntity> _dbSet;
    private readonly IStrapiRepository<TStrapiObject> _strapiRepository;
    private readonly ILogger<SyncService<TEntity, TStrapiObject, TData>> _logger;

    protected SyncService(ILogger<SyncService<TEntity, TStrapiObject, TData>> logger,
        IStrapiRepository<TStrapiObject> strapiRepository,
        IndexDbContext dbContext)
    {
        _logger = logger;
        _strapiRepository = strapiRepository;
        _dbContext = dbContext;
        _dbSet = _dbContext.Set<TEntity>();
    }

    public async Task Execute(CancellationToken cancellationToken = default)
    {
        List<TStrapiObject> strapiDocuments = [];
        for (var page = 0; page < int.MaxValue; page++)
        {
            var currentPage = await _strapiRepository.Get(page, 50, cancellationToken);

            if (currentPage == null)
            {
                continue;
            }

            strapiDocuments.AddRange(currentPage.Data);

            // There is no more page to collect
            if (currentPage.Meta.Pagination.PageCount < 50)
            {
                break;
            }
        }

        var entities = await _dbSet.ToListAsync(cancellationToken);

        var entitiesToBeDeleted = entities.Where(entity => strapiDocuments.All(strapiDocument => strapiDocument.DocumentId != entity.DocumentId)).ToList();
        var numberOfPostsAdded = 0;
        var numberOfEntities = 0;

        foreach (var strapiDocument in strapiDocuments)
        {
            var entity = Convert(strapiDocument);

            var existing = entities.FirstOrDefault(existingEntity => existingEntity.DocumentId == strapiDocument.DocumentId);

            if (existing == null)
            {
                _dbSet.Add(entity);
                numberOfPostsAdded++;
            }
            else
            {
                existing.Data = entity.Data;
                existing.PublishedAt = entity.PublishedAt;
                existing.UpdatedAt = entity.UpdatedAt;
                _dbSet.Update(existing);
                numberOfEntities++;
            }
        }
        
        _dbSet.RemoveRange(entitiesToBeDeleted);

        await _dbContext.SaveChangesAsync(cancellationToken);
        
        _logger.LogInformation("Removed {NumberOfPostsRemoved}, added {NumberOfPostsAdded}, updated {NumberOfPostsUpdated} {EntityName}",
            entitiesToBeDeleted.Count, numberOfPostsAdded, numberOfEntities, typeof(TEntity).Name);
    }

    protected abstract TEntity Convert(TStrapiObject strapiDocument);
}

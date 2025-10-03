using MeleeIndex.DAL;
using MeleeIndex.Repositories.Posts;
using MeleeIndex.Repositories.Strapi;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Services.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace MeleeIndex.Services.Strapi;

public class CategorySyncService : IEntitySyncService
{
    private readonly IStrapiCategoryRepository _strapiCategoryRepository;
    private readonly IndexDbContext _dbContext;
    private readonly ILogger<CategorySyncService> _logger;

    public CategorySyncService(IStrapiCategoryRepository strapiCategoryRepository, IPostRepository postRepository,
        IndexDbContext dbContext, ILogger<CategorySyncService> logger)
    {
        _strapiCategoryRepository = strapiCategoryRepository;
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task Execute(CancellationToken cancellationToken = default)
    {
        List<StrapiCategory> strapiCategories = [];
        for (var page = 0; page < int.MaxValue; page++)
        {
            var currentPage = await _strapiCategoryRepository.Get(page, 50, cancellationToken);

            if (currentPage == null)
            {
                continue;
            }

            strapiCategories.AddRange(currentPage.Data);

            // There is no more page to collect
            if (currentPage.Meta.Pagination.PageCount < 50)
            {
                break;
            }
        }

        var categories = await _dbContext.Categories.ToListAsync(cancellationToken);

        var toBeDeleted = categories.Where(author => strapiCategories.All(strapiAuthor => strapiAuthor.DocumentId != author.DocumentId)).ToList();
        var numberAdded = 0;
        var numberUpdated = 0;

        foreach (var strapiCategory in strapiCategories)
        {
            var category = CategoryMapper.Convert(strapiCategory);

            var existing = categories.FirstOrDefault(existingPost => existingPost.DocumentId == strapiCategory.DocumentId);

            if (existing == null)
            {
                _dbContext.Categories.Add(category);
                numberAdded++;
            }
            else
            {
                existing.CategoryData = category.CategoryData;
                existing.UpdatedAt = category.UpdatedAt;
                _dbContext.Categories.Update(existing);
                numberUpdated++;
            }
        }
        
        _dbContext.Categories.RemoveRange(toBeDeleted);

        await _dbContext.SaveChangesAsync(cancellationToken);
        
        _logger.LogInformation("Removed {NumberOfPostsRemoved} categories, added {NumberOfPostsAdded} categories, updated {NumberOfPostsUpdated} categories", toBeDeleted.Count, numberAdded, numberUpdated);
    }
}

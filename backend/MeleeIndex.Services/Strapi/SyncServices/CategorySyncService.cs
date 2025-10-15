using MeleeIndex.DAL;
using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Repositories.Strapi;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Services.Mappers;
using Microsoft.Extensions.Logging;

namespace MeleeIndex.Services.Strapi.SyncServices;

public class CategorySyncService : SyncService<Category, StrapiCategory, CategoryData>
{
    public CategorySyncService(IStrapiCategoryRepository strapiCategoryRepository,
        IndexDbContext dbContext, ILogger<CategorySyncService> logger) : base(logger, strapiCategoryRepository, dbContext)
    {
    }
    
    protected override Category Convert(StrapiCategory strapiDocument)
    {
        return CategoryMapper.Convert(strapiDocument);
    }
}

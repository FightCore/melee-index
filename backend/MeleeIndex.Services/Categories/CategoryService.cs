using MeleeIndex.Contracts.Categories;
using MeleeIndex.DAL;
using MeleeIndex.Models;
using MeleeIndex.Services.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace MeleeIndex.Services.Categories
{
    public interface ICategoryService
    {
        Task<Category> Create(CreateCategoryModel createCategory);

        Task Delete(Guid id);

    }

    internal class CategoryService : ICategoryService
    {
        private readonly IndexDbContext _dbContext;

        public CategoryService(IndexDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Category> Create(CreateCategoryModel createCategory)
        {
            var category = Convert(createCategory);
            _dbContext.Categories.Add(category);
            await _dbContext.SaveChangesAsync();
            return category;
        }

        public async Task Delete(Guid id)
        {
            var isCategoryInUse = await _dbContext.Posts.AnyAsync(p => p.Category.Id == id);
            if (isCategoryInUse)
            {
                throw new EntityInUseException();
            }

            await _dbContext.Categories.Where(category => category.Id == id).ExecuteDeleteAsync();
        }

        private static Category Convert(CreateCategoryModel createCategory)
        {
            return new Category
            {
                Name = createCategory.Name,
                Color = createCategory.Color,
            };
        }
    }
}

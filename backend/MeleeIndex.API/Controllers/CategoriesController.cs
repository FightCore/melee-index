using FluentValidation;
using MeleeIndex.Api.Errors;
using MeleeIndex.Contracts.Categories;
using MeleeIndex.Services.Categories;
using MeleeIndex.Services.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MeleeIndex.Api.Controllers
{
    [Route("categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IValidator<CreateCategoryModel> _createCategoryValidator;
        private readonly ICategoryService _categoryService;

        public CategoriesController(IValidator<CreateCategoryModel> createCategoryValidator, ICategoryService categoryService)
        {
            _createCategoryValidator = createCategoryValidator;
            _categoryService = categoryService;
        }

        [HttpPost]
        [Authorize(Policy = "ObjectCreation")]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryModel category)
        {
            var result = await _createCategoryValidator.ValidateAsync(category);
            if (!result.IsValid)
            {
                return BadRequest(ValidatorApiError.Create(result));
            }
            var createdCategory = await _categoryService.Create(category);
            return Ok(createdCategory);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] Guid id)
        {
            try
            {
                await _categoryService.Delete(id);
                return NoContent();
            }
            catch (EntityInUseException exception)
            {
                return BadRequest();
            }
        }
    }
}

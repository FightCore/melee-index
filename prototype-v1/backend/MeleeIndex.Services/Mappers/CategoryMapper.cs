using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Utilities;
using System.Text.Json;

namespace MeleeIndex.Services.Mappers;

public static class CategoryMapper
{
    public static Category Convert(StrapiCategory category)
    {
        return new Category
        {
            Id = Guid.NewGuid(),
            CreatedAt = category.CreatedAt,
            UpdatedAt = category.UpdatedAt,
            DocumentId = category.DocumentId,
            StrapiId = category.Id,
            Data = JsonSerializer.Deserialize<CategoryData>(JsonSerializer.Serialize(category, SerializationOptions.CamelCase))!,
        };
    }
}

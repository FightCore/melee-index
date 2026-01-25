using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Utilities;
using System.Text.Json;

namespace MeleeIndex.Services.Mappers;

public static class GlossaryItemMapper
{
    public static GlossaryItem Convert(StrapiGlossaryItem glossaryItem)
    {
        return new GlossaryItem
        {
            Id = Guid.NewGuid(),
            CreatedAt = glossaryItem.CreatedAt,
            UpdatedAt = glossaryItem.UpdatedAt,
            DocumentId = glossaryItem.DocumentId,
            PublishedAt = glossaryItem.PublishedAt,
            StrapiId = glossaryItem.Id,
            Data = JsonSerializer.Deserialize<GlossaryItemData>(
                JsonSerializer.Serialize(glossaryItem, SerializationOptions.CamelCase))!
        };
    } 
}

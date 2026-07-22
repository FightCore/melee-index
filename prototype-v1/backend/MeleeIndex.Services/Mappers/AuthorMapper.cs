using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Utilities;
using System.Text.Json;

namespace MeleeIndex.Services.Mappers;

public static class AuthorMapper
{
    public static Author Convert(StrapiAuthor article)
    {
        return new Author
        {
            Id = Guid.NewGuid(),
            CreatedAt = article.CreatedAt,
            UpdatedAt = article.UpdatedAt,
            DocumentId = article.DocumentId,
            StrapiId = article.Id,
            Data = JsonSerializer.Deserialize<AuthorData>(JsonSerializer.Serialize(article, SerializationOptions.CamelCase))!,
        };
    }
}

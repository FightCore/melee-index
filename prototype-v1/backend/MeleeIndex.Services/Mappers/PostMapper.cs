using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Utilities;
using System.Text.Json;

namespace MeleeIndex.Services.Mappers;

public static class PostMapper
{
    public static Post Convert(Article article)
    {
        return new Post
        {
            Id = Guid.NewGuid(),
            CreatedAt = article.CreatedAt,
            UpdatedAt = article.UpdatedAt,
            PublishedAt = article.PublishedAt,
            DocumentId = article.DocumentId,
            StrapiId = article.Id,
            Data = JsonSerializer.Deserialize<PostData>(JsonSerializer.Serialize(article, SerializationOptions.CamelCase))!,
        };
    }
}

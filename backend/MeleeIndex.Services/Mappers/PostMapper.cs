using MeleeIndex.Models;
using MeleeIndex.Models.Posts;
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
            // Ugly conversion for now, might create a mapper using something like Mapperly later.
            // Fields should match 1:1 but want to separate this to isolate Strapi to its own domain.
            PostData = JsonSerializer.Deserialize<PostData>(JsonSerializer.Serialize(article, SerializationOptions.CamelCase))!,
        };
    }
}

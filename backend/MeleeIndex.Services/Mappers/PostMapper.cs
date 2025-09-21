using MeleeIndex.Models;
using MeleeIndex.Repositories.Strapi.Models;
using System.Text.Json;

namespace MeleeIndex.Services.Mappers;

public static class PostMapper
{
    private static readonly JsonSerializerOptions _serializerOptions = new JsonSerializerOptions
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DictionaryKeyPolicy = JsonNamingPolicy.CamelCase
    };
    
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
            PostData = JsonSerializer.Serialize(article, _serializerOptions),
        };
    }
}

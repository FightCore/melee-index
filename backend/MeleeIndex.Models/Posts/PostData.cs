using MeleeIndex.Models.Serialization;
using System.Text.Json.Serialization;

namespace MeleeIndex.Models.Posts;

public class PostData : JsonExtendableData
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    
    [JsonPropertyName("documentId")]
    public string DocumentId { get; set; }
    
    [JsonPropertyName("title")]
    public string Title { get; set; }
    
    [JsonPropertyName("description")]
    public string? Description { get; set; }
    
    [JsonPropertyName("slug")]
    public string Slug { get; set; }
    
    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; }
    
    [JsonPropertyName("updatedAt")]
    public DateTime UpdatedAt { get; set; }
    
    [JsonPropertyName("publishedAt")]
    public DateTime? PublishedAt { get; set; }
    
    [JsonPropertyName("category")]
    public CategoryData Category { get; set; }
    
    [JsonPropertyName("author")]
    public AuthorData Author { get; set; }
    
    [JsonPropertyName("characters")]
    public List<CharacterData> Characters { get; set; }
    
    [JsonPropertyName("cover")]
    public ImageData Cover { get; set; }
}

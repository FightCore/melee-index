using System.ComponentModel.DataAnnotations.Schema;

namespace MeleeIndex.Models;

public class DocumentEntity
{
    [Column("id")]
    public required Guid Id { get; set; }
    
    [Column("slug")]
    public required string Slug { get; set; }
    
    [Column("created_at")]
    public required DateTime CreatedAt { get; set; }
    
    [Column("updated_at")]
    public required DateTime UpdatedAt { get; set; }
}
using System.ComponentModel.DataAnnotations.Schema;

namespace MeleeIndex.Models;

public class Link : DocumentEntity
{
    [Column("url")]
    public required string Url { get; set; }
    
    [Column("source")]
    public required string Source { get; set; }
    
    [Column("publisher")]
    public required string Publisher { get; set; }
    
    [Column("title")]
    public required string Title { get; set; }
    
    public required Author CreatedBy { get; set; }
    
    [Column("created_by")]
    public required Guid CreatedById { get; set; }
}
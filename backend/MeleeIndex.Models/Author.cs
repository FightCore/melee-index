using System.ComponentModel.DataAnnotations.Schema;

namespace MeleeIndex.Models;

public class Author : DocumentEntity
{
    [Column("name")]
    public required string Name { get; set; }
}
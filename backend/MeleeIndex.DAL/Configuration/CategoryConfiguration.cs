using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Utilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Text.Json;

namespace MeleeIndex.DAL.Configuration;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.Property(author => author.Data)
            .IsRequired()
            .HasColumnType("jsonb")
            .HasConversion(
                value => JsonSerializer.Serialize(value, SerializationOptions.CamelCase),
                value => JsonSerializer.Deserialize<CategoryData>(value, SerializationOptions.CamelCase)!
            );
    }
}

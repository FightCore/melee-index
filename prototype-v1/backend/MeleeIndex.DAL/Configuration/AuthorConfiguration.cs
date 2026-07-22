using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Utilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Text.Json;

namespace MeleeIndex.DAL.Configuration;

public class AuthorConfiguration : IEntityTypeConfiguration<Author>
{
    public void Configure(EntityTypeBuilder<Author> builder)
    {
        builder.Property(author => author.Data)
            .IsRequired()
            .HasColumnType("jsonb")
            .HasConversion(
                value => JsonSerializer.Serialize(value, SerializationOptions.CamelCase),
                value => JsonSerializer.Deserialize<AuthorData>(value, SerializationOptions.CamelCase)!
            );
    }
}

using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Utilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Text.Json;

namespace MeleeIndex.DAL.Configuration;

public class CharacterConfiguration : IEntityTypeConfiguration<Character>
{
    public void Configure(EntityTypeBuilder<Character> builder)
    {
        builder.Property(author => author.CharacterData)
            .IsRequired()
            .HasColumnType("jsonb")
            .HasConversion(
                value => JsonSerializer.Serialize(value, SerializationOptions.CamelCase),
                value => JsonSerializer.Deserialize<CharacterData>(value, SerializationOptions.CamelCase)!
            );
    }
}

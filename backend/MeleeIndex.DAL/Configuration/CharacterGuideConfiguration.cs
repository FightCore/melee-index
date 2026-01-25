using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Utilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Text.Json;

namespace MeleeIndex.DAL.Configuration;

public class CharacterGuideConfiguration : IEntityTypeConfiguration<CharacterGuide>
{
    public void Configure(EntityTypeBuilder<CharacterGuide> builder)
    {
        builder.Property(characterGuide => characterGuide.Data)
            .IsRequired()
            .HasColumnType("jsonb")
            .HasConversion(
                value => JsonSerializer.Serialize(value, SerializationOptions.CamelCase),
                value => JsonSerializer.Deserialize<CharacterGuideData>(value, SerializationOptions.CamelCase)!
            );
    }
}

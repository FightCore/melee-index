using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Utilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Text.Json;

namespace MeleeIndex.DAL.Configuration;

public class GlossaryItemConfiguration : IEntityTypeConfiguration<GlossaryItem>
{
    public void Configure(EntityTypeBuilder<GlossaryItem> builder)
    {
        builder.Property(glossaryItem => glossaryItem.Data)
            .IsRequired()
            .HasColumnType("jsonb")
            .HasConversion(
                value => JsonSerializer.Serialize(value, SerializationOptions.CamelCase),
                value => JsonSerializer.Deserialize<GlossaryItemData>(value, SerializationOptions.CamelCase)!
            );
    }
}

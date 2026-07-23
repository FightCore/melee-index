using MeleeIndex.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MeleeIndex.Data.Configurations;

public class LinkEntityConfiguration : IEntityTypeConfiguration<Link>
{
    public void Configure(EntityTypeBuilder<Link> builder)
    {
        builder.ToTable("links");

        builder.HasOne(link => link.CreatedBy)
            .WithMany()
            .HasForeignKey(link => link.CreatedById);
    }
}
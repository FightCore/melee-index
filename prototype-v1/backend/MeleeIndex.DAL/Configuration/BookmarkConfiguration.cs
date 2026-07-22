using MeleeIndex.Models.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MeleeIndex.DAL.Configuration;

public class BookmarkConfiguration : IEntityTypeConfiguration<Bookmark>
{
    public void Configure(EntityTypeBuilder<Bookmark> builder)
    {
        builder.HasOne(bookmark => bookmark.User)
            .WithMany();
        builder.HasOne(bookmark => bookmark.Post)
            .WithMany();
    }
}

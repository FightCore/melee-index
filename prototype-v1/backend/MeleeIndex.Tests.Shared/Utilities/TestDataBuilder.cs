using MeleeIndex.Models;
using MeleeIndex.Models.Users;
using MeleeIndex.Models.DataEntities;

namespace MeleeIndex.Tests.Shared.Utilities;

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor.

public class TestDataBuilder
{
    public static Post CreatePost(
        string title = "Test Post",
        bool published = true,
        Guid? id = null)
    {
        var documentId = Guid.NewGuid();
        return new Post
        {
            Id = id ?? Guid.NewGuid(),
            DocumentId = documentId.ToString(),
            Data = new PostData
            {
                DocumentId = documentId.ToString(),
                Title = title,
                Description = "Test description",
                Slug = title.ToLower().Replace(" ", "-")
            },
            PublishedAt = published ? DateTime.UtcNow.AddDays(-1) : null,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
    }

    public static User CreateUser(
        string discordId = "123456789",
        string username = "testuser",
        Guid? id = null)
    {
        return new User
        {
            Id = id ?? Guid.NewGuid(),
            Provider = "discord",
            ProviderId = discordId,
            Username = username,
            Admin = false
        };
    }

    public static Bookmark CreateBookmark(
        Guid? userId = null,
        Guid? postId = null,
        Guid? id = null)
    {
        return new Bookmark
        {
            Id = id ?? Guid.NewGuid(),
            UserId = userId ?? Guid.NewGuid(),
            PostId = postId ?? Guid.NewGuid(),
            CreatedAt = DateTime.UtcNow
        };
    }
}

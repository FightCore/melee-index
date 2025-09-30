using MeleeIndex.Contracts.Posts;
using MeleeIndex.Models.Posts;

namespace MeleeIndex.GraphQL.Mapper;

public static class PostDataMapper
{
    public static PostModel Convert(PostData postData)
    { 
        return new PostModel
        {
            Id = postData.Id,
            DocumentId = postData.DocumentId,
            Title = postData.Title,
            Description = postData.Description,
            Slug = postData.Slug,
            CreatedAt = postData.CreatedAt,
            UpdatedAt = postData.UpdatedAt,
            PublishedAt = postData.PublishedAt,
            Category = new CategoryModel()
            {
                Name = postData.Category.Name,
                Slug = postData.Category.Slug
            },  
            Author = new AuthorModel()
            {
                Name = postData.Author.Name,
                Avatar = new ImageModel()
                {
                    Url = postData.Author.Avatar.Url,
                    AlternativeText = postData.Author.Avatar.AlternativeText
                }
            },
            Characters = postData.Characters.Select(character => 
                new CharacterModel()
                {
                    Name = character.Name,
                    Slug = character.Slug
                }).ToList(),
            Cover = new ImageModel()
            {
                Url = postData.Cover.Url,
                AlternativeText = postData.Cover.AlternativeText
            }
        };
    }
}

using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Utilities;
using System.Text.Json;

namespace MeleeIndex.Services.Mappers;

public static class CharacterMapper
{
    public static Character Convert(StrapiCharacter character)
    {
        return new Character
        {
            Id = Guid.NewGuid(),
            CreatedAt = character.CreatedAt,
            UpdatedAt = character.UpdatedAt,
            DocumentId = character.DocumentId,
            StrapiId = character.Id,
            CharacterData = JsonSerializer.Deserialize<CharacterData>(JsonSerializer.Serialize(character, SerializationOptions.CamelCase))!,
        };
    }
}

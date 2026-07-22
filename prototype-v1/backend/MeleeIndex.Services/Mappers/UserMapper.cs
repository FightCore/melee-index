using MeleeIndex.Models.Users;
using MeleeIndex.Services.Authentication;
using MeleeIndex.Services.Users;

namespace MeleeIndex.Services.Mappers;

internal static class UserMapper
{
    public static User FromCreateDto(CreateUserDto user)
    {
        return new User
        {
            Id = Guid.NewGuid(),
            Provider = user.Provider,
            ProviderId = user.ProviderId,
            Username = user.Username,
            Admin = false
        };
    }
}

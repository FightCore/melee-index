using MeleeIndex.Configurations;
using MeleeIndex.Services.Authentication;
using MeleeIndex.Services.Posts;
using MeleeIndex.Services.Strapi;
using MeleeIndex.Services.Users;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MeleeIndex.Services.Configurations;

public static class DependencyExtensions
{
    public static IServiceCollection AddPostServices(this IServiceCollection services, IConfiguration configuration)
    {
        services
            .AddScoped<IEntitySyncService, ArticleSyncService>()
            .AddScoped<IEntitySyncService, AuthorSyncService>()
            .AddScoped<IEntitySyncService, CategorySyncService>()
            .AddScoped<IEntitySyncService, CharacterSyncService>()
            .AddScoped<IStrapiSyncService, StrapiSyncService>()
            .AddScoped<IPostService, PostService>()
            .AddScoped<IJwtService, JwtService>()
            .AddScoped<IUserService, UserService>();

        return services;
    }
}

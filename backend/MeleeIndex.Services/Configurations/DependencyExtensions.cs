using MeleeIndex.Services.Authors;
using MeleeIndex.Services.Categories;
using MeleeIndex.Services.Posts;
using MeleeIndex.Services.Sources;
using MeleeIndex.Services.Tags;
using Microsoft.Extensions.DependencyInjection;

namespace MeleeIndex.Services.Configurations;

public static class DependencyExtensions
{
    public static IServiceCollection AddPostServices(this IServiceCollection services)
    {
        return services
            .AddScoped<IPostService, PostService>()
            .AddScoped<IAuthorService, AuthorService>()
            .AddScoped<ISourceService, SourceService>()
            .AddScoped<ICategoryService, CategoryService>()
            .AddScoped<ITagService, TagService>();
    }
}
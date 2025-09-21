using MeleeIndex.Configurations;
using MeleeIndex.Repositories.Posts;
using MeleeIndex.Repositories.Strapi;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MeleeIndex.Repositories.Configuration;

public static class DependencyInjection
{
    public static IServiceCollection AddRepositories(this IServiceCollection services, IConfiguration configuration)
    {
        var strapiConfiguration = configuration.GetSection(StrapiConfiguration.SectionName).Get<StrapiConfiguration>();

        services.Configure<StrapiConfiguration>(configuration.GetSection(StrapiConfiguration.SectionName));
        
        services.AddHttpClient<IArticleRepository, ArticleRepository>(client =>
        {
            client.BaseAddress = new Uri(strapiConfiguration.Uri);
        });
        return services.AddScoped<IPostRepository, PostRepository>();
    }
}

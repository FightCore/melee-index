using MeleeIndex.Configurations;
using MeleeIndex.Repositories.Posts;
using MeleeIndex.Repositories.Strapi;
using MeleeIndex.Repositories.Users;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MeleeIndex.Repositories.Configuration;

public static class DependencyInjection
{
    public static IServiceCollection AddRepositories(this IServiceCollection services, IConfiguration configuration)
    {
        var strapiConfiguration = configuration.GetSection(StrapiConfiguration.SectionName).Get<StrapiConfiguration>();

        services.Configure<StrapiConfiguration>(configuration.GetSection(StrapiConfiguration.SectionName));
        services.AddStrapiHttpClient<IArticleRepository, ArticleRepository>(strapiConfiguration);
        services.AddStrapiHttpClient<IStrapiAuthorRepository, StrapiAuthorRepository>(strapiConfiguration);
        services.AddStrapiHttpClient<IStrapiCategoryRepository, StrapiCategoryRepository>(strapiConfiguration);
        services.AddStrapiHttpClient<IStrapiCharacterRepository, StrapiCharacterRepository>(strapiConfiguration);
        services.AddStrapiHttpClient<IStrapiSourceRepository, StrapiSourceRepository>(strapiConfiguration);
        services.AddStrapiHttpClient<IStrapiResourceRepository, StrapiResourceRepository>(strapiConfiguration);
        
        return services.AddScoped<IPostRepository, PostRepository>()
            .AddScoped<IBookmarkRepository, BookmarkRepository>();
    }
    
    
    private static IHttpClientBuilder AddStrapiHttpClient<TInterface, TImplementation>(this IServiceCollection services, StrapiConfiguration strapiConfiguration)
        where TInterface : class
        where TImplementation : class, TInterface
    {
        return services.AddHttpClient<TInterface, TImplementation>(client =>
        {
            client.BaseAddress = new Uri(strapiConfiguration.Uri);
        });
    }
}

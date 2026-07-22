using MeleeIndex.Repositories.Strapi.Models;
using System.Net.Http.Json;

namespace MeleeIndex.Repositories.Strapi;

public interface IArticleRepository : IStrapiRepository<Article>
{
}

internal class ArticleRepository : StrapiRepository<Article>, IArticleRepository
{
    public ArticleRepository(HttpClient httpClient) : base(httpClient)
    {
    }

    protected override string Resource => "articles";

    protected override string Populate =>
        "populate[blocks][populate]=*&populate[author][populate]=*&populate[cover][populate]=*&populate[category][populate]=*&populate[characters][populate]=*";
    
}

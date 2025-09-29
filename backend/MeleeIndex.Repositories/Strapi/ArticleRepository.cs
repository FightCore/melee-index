using MeleeIndex.Repositories.Strapi.Models;
using System.Net.Http.Json;

namespace MeleeIndex.Repositories.Strapi;

public interface IArticleRepository
{
    Task<StrapiRequest<Article>?> Get(int page, int pageSize, CancellationToken cancellationToken = default);
}

internal class ArticleRepository : IArticleRepository
{
    private readonly HttpClient _httpClient;

    public ArticleRepository(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<StrapiRequest<Article>?> Get(int page, int pageSize, CancellationToken cancellationToken = default)
    {
        var url = $"api/articles?pagination[page]={page}&pagination[pageSize]={pageSize}&populate[blocks][populate]=*&populate[author][populate]=*&populate[cover][populate]=*&populate[category][populate]=*&populate[characters][populate]=*";
        var response = await _httpClient.GetAsync(url, cancellationToken);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<StrapiRequest<Article>>(cancellationToken);
    }
}

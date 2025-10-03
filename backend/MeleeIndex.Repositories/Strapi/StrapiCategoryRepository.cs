using MeleeIndex.Repositories.Strapi.Models;
using System.Net.Http.Json;

namespace MeleeIndex.Repositories.Strapi;

public interface IStrapiCategoryRepository
{
    Task<StrapiRequest<StrapiCategory>?> Get(int page, int pageSize, CancellationToken cancellationToken = default);
} 

public class StrapiCategoryRepository : IStrapiCategoryRepository
{ 
    private readonly HttpClient _httpClient;

    public StrapiCategoryRepository(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<StrapiRequest<StrapiCategory>?> Get(int page, int pageSize, CancellationToken cancellationToken = default)
    {
        var url = $"api/categories?pagination[page]={page}&pagination[pageSize]={pageSize}";
        var response = await _httpClient.GetAsync(url, cancellationToken);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<StrapiRequest<StrapiCategory>>(cancellationToken);
    }
    
}

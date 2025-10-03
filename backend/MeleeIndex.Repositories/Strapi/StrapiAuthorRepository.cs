using MeleeIndex.Repositories.Strapi.Models;
using System.Net.Http.Json;

namespace MeleeIndex.Repositories.Strapi;

public interface IStrapiAuthorRepository
{
    Task<StrapiRequest<StrapiAuthor>?> Get(int page, int pageSize, CancellationToken cancellationToken = default);
} 

public class StrapiAuthorRepository : IStrapiAuthorRepository
{ 
    private readonly HttpClient _httpClient;

    public StrapiAuthorRepository(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<StrapiRequest<StrapiAuthor>?> Get(int page, int pageSize, CancellationToken cancellationToken = default)
    {
        var url = $"api/authors?pagination[page]={page}&pagination[pageSize]={pageSize}&populate=avatar";
        var response = await _httpClient.GetAsync(url, cancellationToken);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<StrapiRequest<StrapiAuthor>>(cancellationToken);
    }
    
}

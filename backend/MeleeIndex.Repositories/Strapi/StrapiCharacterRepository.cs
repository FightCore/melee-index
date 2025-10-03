using MeleeIndex.Repositories.Strapi.Models;
using System.Net.Http.Json;

namespace MeleeIndex.Repositories.Strapi;

public interface IStrapiCharacterRepository
{
    Task<StrapiRequest<StrapiCharacter>?> Get(int page, int pageSize, CancellationToken cancellationToken = default);
} 

public class StrapiCharacterRepository : IStrapiCharacterRepository
{
    private readonly HttpClient _httpClient;

    public StrapiCharacterRepository(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<StrapiRequest<StrapiCharacter>?> Get(int page, int pageSize, CancellationToken cancellationToken = default)
    {
        var url = $"api/characters?pagination[page]={page}&pagination[pageSize]={pageSize}";
        var response = await _httpClient.GetAsync(url, cancellationToken);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<StrapiRequest<StrapiCharacter>>(cancellationToken);
    }
    
}

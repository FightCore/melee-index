using MeleeIndex.Repositories.Strapi.Models;
using System.Net.Http.Json;

namespace MeleeIndex.Repositories.Strapi;

public interface IStrapiRepository<TStrapiModel>
    where TStrapiModel : StrapiDocument
{
    Task<StrapiRequest<TStrapiModel>?> Get(int page, int pageSize, CancellationToken cancellationToken = default);
}

public abstract class StrapiRepository<TStrapiModel> : IStrapiRepository<TStrapiModel>
    where TStrapiModel : StrapiDocument
{
    protected readonly HttpClient HttpClient;
    
    protected abstract string Resource { get; }
    protected abstract string Populate { get; }

    protected StrapiRepository(HttpClient httpClient)
    {
        HttpClient = httpClient;
    }

    public async Task<StrapiRequest<TStrapiModel>?> Get(int page, int pageSize, CancellationToken cancellationToken = default)
    { 
        var url = $"api/{Resource}?pagination[page]={page}&pagination[pageSize]={pageSize}";
        if (!string.IsNullOrEmpty(Populate))
        {
            url += $"&{Populate}";
        }

        var response = await HttpClient.GetAsync(url, cancellationToken);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<StrapiRequest<TStrapiModel>>(cancellationToken);
    }
}

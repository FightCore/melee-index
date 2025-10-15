using MeleeIndex.Repositories.Strapi.Models;
using System.Net.Http.Json;

namespace MeleeIndex.Repositories.Strapi;

public interface IStrapiCategoryRepository : IStrapiRepository<StrapiCategory>
{
} 

public class StrapiCategoryRepository : StrapiRepository<StrapiCategory>, IStrapiCategoryRepository
{ 
    public StrapiCategoryRepository(HttpClient httpClient) : base(httpClient)
    {
    }

    protected override string Resource => "categories";
    
    protected override string Populate => string.Empty;
}

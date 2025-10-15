using MeleeIndex.Repositories.Strapi.Models;
using System.Net.Http.Json;

namespace MeleeIndex.Repositories.Strapi;

public interface IStrapiAuthorRepository : IStrapiRepository<StrapiAuthor>
{
} 

public class StrapiAuthorRepository : StrapiRepository<StrapiAuthor>, IStrapiAuthorRepository
{ 
    public StrapiAuthorRepository(HttpClient httpClient) : base(httpClient)
    {
    }

    protected override string Resource => "authors";

    protected override string Populate => "populate=avatar";
}

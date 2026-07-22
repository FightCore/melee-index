using MeleeIndex.Repositories.Strapi.Models;
using System.Net.Http.Json;

namespace MeleeIndex.Repositories.Strapi;

public interface IStrapiCharacterRepository : IStrapiRepository<StrapiCharacter>
{
} 

public class StrapiCharacterRepository : StrapiRepository<StrapiCharacter>, IStrapiCharacterRepository
{

    public StrapiCharacterRepository(HttpClient httpClient) : base(httpClient)
    {
    }

    protected override string Resource => "characters";
    
    protected override string Populate => string.Empty;
}

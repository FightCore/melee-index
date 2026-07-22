using MeleeIndex.Models;
using MeleeIndex.Repositories.Strapi.Models;

namespace MeleeIndex.Repositories.Strapi;

public interface IStrapiCharacterGuideRepository : IStrapiRepository<StrapiCharacterGuide>
{
}

internal class StrapiStrapiCharacterGuideRepository : StrapiRepository<StrapiCharacterGuide>, IStrapiCharacterGuideRepository
{
    public StrapiStrapiCharacterGuideRepository(HttpClient httpClient) : base(httpClient)
    {
    }

    protected override string Resource => "character-guides";
    protected override string Populate => "populate[sections][on][meta.collection][populate][articles][populate]=*&populate[sections][on][meta.collection][populate][resources][populate]=*";
}

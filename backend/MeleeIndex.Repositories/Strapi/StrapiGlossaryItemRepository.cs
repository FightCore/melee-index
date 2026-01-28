using MeleeIndex.Repositories.Strapi.Models;

namespace MeleeIndex.Repositories.Strapi;

public interface IStrapiGlossaryItemRepository : IStrapiRepository<StrapiGlossaryItem>
{
}

internal class StrapiGlossaryItemRepository : StrapiRepository<StrapiGlossaryItem>, IStrapiGlossaryItemRepository
{
    public StrapiGlossaryItemRepository(HttpClient httpClient) : base(httpClient)
    {
    }

    protected override string Resource => "glossary-items";
    protected override string Populate => "populate[blocks][populate]=*&populate[author][populate]=*&populate[categories][populate]=*&populate[cover][populate]=*&populate[characters][populate]=*";
}

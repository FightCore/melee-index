using MeleeIndex.Repositories.Strapi.Models;

namespace MeleeIndex.Repositories.Strapi;

public interface IStrapiSourceRepository : IStrapiRepository<StrapiSource>
{
}

public class StrapiSourceRepository : StrapiRepository<StrapiSource>, IStrapiSourceRepository
{
    public StrapiSourceRepository(HttpClient httpClient) : base(httpClient)
    {
    }

    protected override string Resource => "sources";
    protected override string Populate => string.Empty;
}

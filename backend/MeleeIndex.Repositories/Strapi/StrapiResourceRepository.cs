using MeleeIndex.Repositories.Strapi.Models;

namespace MeleeIndex.Repositories.Strapi;

public interface IStrapiResourceRepository : IStrapiRepository<StrapiResource>
{
}

public class StrapiResourceRepository : StrapiRepository<StrapiResource>, IStrapiResourceRepository
{
    public StrapiResourceRepository(HttpClient httpClient) : base(httpClient)
    {
    }

    protected override string Resource => "resources";
    protected override string Populate => "populate=*";
}

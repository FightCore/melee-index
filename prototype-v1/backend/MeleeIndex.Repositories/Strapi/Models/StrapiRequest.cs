namespace MeleeIndex.Repositories.Strapi.Models;

public class StrapiRequest<TData>
{
    public List<TData> Data { get; set; }
    
    public Meta Meta { get; set; }
}

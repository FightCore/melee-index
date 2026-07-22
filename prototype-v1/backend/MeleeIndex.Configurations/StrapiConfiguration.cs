namespace MeleeIndex.Configurations;
public class StrapiConfiguration
{
    public const string SectionName = "Strapi";

    public required string Uri { get; set; }

    public required string ApiKey { get; set; }
}

namespace MeleeIndex.Services.Strapi;

public interface IEntitySyncService
{
    Task Execute(CancellationToken cancellationToken = default);
}

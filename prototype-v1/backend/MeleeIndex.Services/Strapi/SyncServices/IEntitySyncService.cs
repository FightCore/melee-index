namespace MeleeIndex.Services.Strapi.SyncServices;

public interface IEntitySyncService
{
    Task Execute(CancellationToken cancellationToken = default);
}

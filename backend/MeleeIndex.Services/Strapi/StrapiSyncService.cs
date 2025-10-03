using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;

namespace MeleeIndex.Services.Strapi;

public interface IStrapiSyncService
{
    Task Execute(CancellationToken cancellationToken = default);
}

public class StrapiSyncService : IStrapiSyncService
{
    private readonly List<IEntitySyncService> _syncServices;
    private readonly ILogger<StrapiSyncService> _logger;
    private readonly IDistributedCache _distributedCache;
    
    public StrapiSyncService(IEnumerable<IEntitySyncService> syncServices, ILogger<StrapiSyncService> logger, IDistributedCache distributedCache)
    {
        _syncServices = syncServices.ToList();
        _logger = logger;
        _distributedCache = distributedCache;
    }


    public async Task Execute(CancellationToken cancellationToken = default)
    {
        foreach (var syncService in _syncServices)
        {
            try
            {
                await syncService.Execute(cancellationToken);
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Failed to sync using the {ClassName} service", syncService.GetType().Name);
            }
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace MeleeIndex.Startup.PostSetups;

public static class MigrateContext
{
    public static async Task MigrationContext<TDbContext>(this IServiceProvider services, IConfiguration configuration)
        where TDbContext : DbContext
    {
        if (!configuration.GetValue<bool>("MigrateDatabase"))
        {
            return;
        }
        
        
    }
}

using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace MeleeIndex.Startup.PostSetups;

public static class MigrateContext
{
    public static async Task MigrationContext<TDbContext>(this WebApplication webApplication)
        where TDbContext : DbContext
    {
        var logger = webApplication.Logger;
        if (!webApplication.Configuration.GetValue<bool>("MigrateDatabase"))
        {
            logger.LogInformation("Skipping database migration");
            return;
        }

        var dbContext = webApplication.Services.GetRequiredService<TDbContext>();
        logger.LogInformation("Starting database migrations");
        await dbContext.Database.MigrateAsync();
        logger.LogInformation("Migrated database successfully");
        
    }
}

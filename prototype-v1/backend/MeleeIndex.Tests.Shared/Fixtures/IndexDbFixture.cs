using MeleeIndex.DAL;
using Microsoft.EntityFrameworkCore;
using Testcontainers.PostgreSql;

namespace MeleeIndex.Tests.Shared.Fixtures;

public class IndexDbFixture : IAsyncLifetime
{
    private PostgreSqlContainer? _container;

    public IndexDbContext? DbContext { get; private set; }

    public string? ConnectionString { get; private set; }

    public async Task InitializeAsync()
    {
        _container = new PostgreSqlBuilder()
            .WithImage("postgres:16-alpine")
            .WithDatabase("meleeindex_test")
            .WithUsername("postgres")
            .WithPassword("localcontainer")
            .Build();

        await _container.StartAsync();

        ConnectionString = _container.GetConnectionString();

        var options = new DbContextOptionsBuilder<IndexDbContext>()
            .UseNpgsql(ConnectionString)
            .Options;

        DbContext = new IndexDbContext(options);

        await DbContext.Database.MigrateAsync();
    }

    public async Task DisposeAsync()
    {
        if (DbContext != null)
        {
            await DbContext.DisposeAsync();
        }

        if (_container != null)
        {
            await _container.StopAsync();
            await _container.DisposeAsync();
        }
    }

    public async Task ResetDatabase()
    {
        if (DbContext == null)
        {
            return;
        }

        // Delete all entities in a specific order to not get foreign key conflicts
        await DbContext.Bookmarks.ExecuteDeleteAsync();
        await DbContext.Users.ExecuteDeleteAsync();
        await DbContext.Posts.ExecuteDeleteAsync();
        await DbContext.Authors.ExecuteDeleteAsync();
        await DbContext.Categories.ExecuteDeleteAsync();
        await DbContext.Characters.ExecuteDeleteAsync();
        await DbContext.Resources.ExecuteDeleteAsync();
        await DbContext.Sources.ExecuteDeleteAsync();

        await DbContext.SaveChangesAsync();
    }
}

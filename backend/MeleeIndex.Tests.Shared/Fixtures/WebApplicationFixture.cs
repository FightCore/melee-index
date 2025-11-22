using MeleeIndex.DAL;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace MeleeIndex.Tests.Shared.Fixtures;

public class WebApplicationFixture : WebApplicationFactory<Program>, IAsyncLifetime
{
    private IndexDbFixture? _databaseFixture;

    public HttpClient TestClient { get; private set; } = null!;

    public IndexDbContext? DbContext => _databaseFixture?.DbContext;

    public async Task InitializeAsync()
    {
        _databaseFixture = new IndexDbFixture();
        await _databaseFixture.InitializeAsync();

        TestClient = CreateClient();
    }

    public new async Task DisposeAsync()
    {
        TestClient?.Dispose();

        if (_databaseFixture != null)
        {
            await _databaseFixture.DisposeAsync();
        }

        await base.DisposeAsync();
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        base.ConfigureWebHost(builder);

        builder.ConfigureServices(services =>
        {
            // Replace the default injected DbContext with the testing variant.
            var descriptor = services.FirstOrDefault(
                serviceDescriptor => serviceDescriptor.ServiceType == typeof(DbContextOptions<IndexDbContext>));

            if (descriptor != null)
            {
                services.Remove(descriptor);
            }
            
            services.AddDbContext<IndexDbContext>(options =>
                options.UseNpgsql(_databaseFixture!.ConnectionString));
        });
    }
}

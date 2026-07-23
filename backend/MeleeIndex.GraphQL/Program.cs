using Microsoft.EntityFrameworkCore;
using Serilog;
using Serilog.Events;
using System.Reflection;
using MeleeIndex.Data;
using Microsoft.AspNetCore.ResponseCaching;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddUserSecrets(Assembly.GetExecutingAssembly())
    .AddEnvironmentVariables();

builder.Logging.ClearProviders();

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateBootstrapLogger();

var logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .CreateLogger();

builder.Logging.AddSerilog(logger);

builder.Services.AddSerilog(logger);

builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration.GetConnectionString("Redis");
});

builder.Services.AddPooledDbContextFactory<MeleeIndexDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));
builder.AddGraphQL()
    .RegisterDbContextFactory<MeleeIndexDbContext>()
    .AddProjections().AddFiltering().AddSorting().AddTypes()
        .ModifyCostOptions(options =>
        {
            options.Filtering.DefaultFilterArgumentCost = 0.1;
            options.Filtering.DefaultFilterOperationCost = 0.1;
            options.Filtering.DefaultExpensiveFilterOperationCost = 0.1;
            options.Filtering.VariableMultiplier = 1;
        });

builder.Services.AddCors(options => options.AddPolicy("AllowAll", policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

var app = builder.Build();
app.UseSerilogRequestLogging(options =>
{
    options.Logger = logger;
});

app.MapGraphQL();

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<ResponseCachingMiddleware>();

var dbContext = app.Services.GetRequiredService<MeleeIndexDbContext>();
logger.Information("Starting database migrations");
await dbContext.Database.MigrateAsync();
logger.Information("Migrated database successfully");

app.RunWithGraphQLCommands(args);

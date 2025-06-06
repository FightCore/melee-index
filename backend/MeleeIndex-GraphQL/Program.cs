using System.Reflection;
using MeleeIndex.DAL;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddUserSecrets(Assembly.GetExecutingAssembly())
    .AddEnvironmentVariables();

builder.Services.AddPooledDbContextFactory<IndexDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));
builder.AddGraphQL().RegisterDbContextFactory<IndexDbContext>().AddProjections().AddFiltering().AddSorting().AddTypes()
        .ModifyCostOptions(options =>
        {
            options.Filtering.DefaultFilterArgumentCost = 0.1;
            options.Filtering.DefaultFilterOperationCost = 0.1;
            options.Filtering.DefaultExpensiveFilterOperationCost = 0.1;
            options.Filtering.VariableMultiplier = 1;
        });

builder.Services.AddCors(options => options.AddPolicy("AllowAll", policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

var app = builder.Build();

app.MapGraphQL();

app.UseCors("AllowAll");

app.RunWithGraphQLCommands(args);

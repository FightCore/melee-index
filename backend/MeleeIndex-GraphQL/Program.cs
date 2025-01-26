using MeleeIndex.DAL;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContextFactory<IndexDbContext>(options => options.UseNpgsql());
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

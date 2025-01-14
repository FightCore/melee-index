var builder = WebApplication.CreateBuilder(args);

builder.AddGraphQL().AddProjections().AddFiltering().AddSorting().AddTypes();

var app = builder.Build();

app.MapGraphQL();

app.RunWithGraphQLCommands(args);

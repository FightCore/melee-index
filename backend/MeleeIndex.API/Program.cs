using System.Text;
using FluentValidation;
using MeleeIndex.Api.Configurations;
using MeleeIndex.Api.Startup;
using MeleeIndex.Api.Validators;
using MeleeIndex.Contracts.Authors;
using MeleeIndex.Contracts.Categories;
using MeleeIndex.Contracts.Posts;
using MeleeIndex.Contracts.Sources;
using MeleeIndex.Contracts.Tags;
using MeleeIndex.DAL;
using MeleeIndex.Services.Authentication;
using MeleeIndex.Services.Configurations;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables();
var jwtConfiguration = builder.Configuration.GetSection(JwtConfiguration.Key).Get<JwtConfiguration>();

builder.Services.Configure<JwtConfiguration>(builder.Configuration.GetSection(JwtConfiguration.Key));
builder.Services.Configure<OAuthConfiguration>(builder.Configuration.GetSection(OAuthConfiguration.Key));
// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
})
.AddCookie()
.AddConfiguredDiscordAuthentication(builder.Configuration)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtConfiguration.Issuer,
        ValidAudience = jwtConfiguration.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfiguration.Secret))
    };
});
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ObjectCreation", policy => policy.RequireClaim(CustomClaims.Admin, "True", "true"));
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddScoped<IValidator<CreatePostModel>,CreatePostValidator>();
builder.Services.AddScoped<IValidator<CreateAuthorModel>,CreateAuthorValidator>();
builder.Services.AddScoped<IValidator<CreateCategoryModel>,CreateCategoryValidator>();
builder.Services.AddScoped<IValidator<CreateSourceModel>,CreateSourceValidator>();
builder.Services.AddScoped<IValidator<CreateTagModel>,CreateTagValidator>();

builder.Services.AddDbContext<IndexDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options => options.AddPolicy("AllowAll", policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
builder.Services.AddPostServices();
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
using MeleeIndex.DAL;
using MeleeIndex.Models;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Repositories.Posts;
using MeleeIndex.Repositories.Strapi;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Services.Mappers;
using Microsoft.Extensions.Logging;

namespace MeleeIndex.Services.Strapi.SyncServices;

public class ArticleSyncService : SyncService<Post, Article, PostData>
{
    public ArticleSyncService(IArticleRepository articleRepository, IPostRepository postRepository,
        IndexDbContext dbContext, ILogger<ArticleSyncService> logger) : base(logger, articleRepository, dbContext)
    {
    }

    protected override Post Convert(Article strapiDocument)
    {
        return PostMapper.Convert(strapiDocument);
    }
}

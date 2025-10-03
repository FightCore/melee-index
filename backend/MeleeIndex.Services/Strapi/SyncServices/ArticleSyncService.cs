using MeleeIndex.DAL;
using MeleeIndex.Repositories.Posts;
using MeleeIndex.Repositories.Strapi;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Services.Mappers;
using Microsoft.Extensions.Logging;

namespace MeleeIndex.Services.Strapi;

public class ArticleSyncService : IEntitySyncService
{
    private readonly IArticleRepository _articleRepository;
    private readonly IPostRepository _postRepository;
    private readonly IndexDbContext _dbContext;
    private readonly ILogger<ArticleSyncService> _logger;

    public ArticleSyncService(IArticleRepository articleRepository, IPostRepository postRepository,
        IndexDbContext dbContext, ILogger<ArticleSyncService> logger)
    {
        _articleRepository = articleRepository;
        _postRepository = postRepository;
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task Execute(CancellationToken cancellationToken = default)
    {
        List<Article> articles = [];
        for (var page = 0; page < int.MaxValue; page++)
        {
            var currentPage = await _articleRepository.Get(page, 50, cancellationToken);

            if (currentPage == null)
            {
                continue;
            }

            articles.AddRange(currentPage.Data);

            // There is no more page to collect
            if (currentPage.Meta.Pagination.PageCount < 50)
            {
                break;
            }
        }

        var posts = await _postRepository.GetAll(true);

        var postToBeDeleted = posts.Where(post => articles.All(article => article.DocumentId != post.DocumentId)).ToList();
        var numberOfPostsAdded = 0;
        var numberOfPostsUpdated = 0;

        foreach (var article in articles)
        {
            var post = PostMapper.Convert(article);

            var existing = posts.FirstOrDefault(existingPost => existingPost.DocumentId == article.DocumentId);

            if (existing == null)
            {
                _postRepository.Add(post);
                numberOfPostsAdded++;
            }
            else
            {
                existing.PostData = post.PostData;
                existing.PublishedAt = post.PublishedAt;
                existing.UpdatedAt = post.UpdatedAt;
                _postRepository.Update(existing);
                numberOfPostsUpdated++;
            }
        }
        
        _dbContext.Posts.RemoveRange(postToBeDeleted);

        await _dbContext.SaveChangesAsync(cancellationToken);
        
        _logger.LogInformation("Removed {NumberOfPostsRemoved} posts, added {NumberOfPostsAdded} posts, updated {NumberOfPostsUpdated} posts", postToBeDeleted.Count, numberOfPostsAdded, numberOfPostsUpdated);
    }
}

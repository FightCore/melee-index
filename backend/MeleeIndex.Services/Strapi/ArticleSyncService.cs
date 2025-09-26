using MeleeIndex.DAL;
using MeleeIndex.Repositories.Posts;
using MeleeIndex.Repositories.Strapi;
using MeleeIndex.Repositories.Strapi.Models;
using MeleeIndex.Services.Mappers;

namespace MeleeIndex.Services.Strapi;

public interface IArticleSyncService
{
    Task Execute(CancellationToken cancellationToken = default);
}

public class ArticleSyncService : IArticleSyncService
{
    private readonly IArticleRepository _articleRepository;
    private readonly IPostRepository _postRepository;
    private readonly IndexDbContext _dbContext;

    public ArticleSyncService(IArticleRepository articleRepository, IPostRepository postRepository,
        IndexDbContext dbContext)
    {
        _articleRepository = articleRepository;
        _postRepository = postRepository;
        _dbContext = dbContext;
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

        var postToBeDeleted = posts.Where(post => articles.All(article => article.DocumentId != post.DocumentId));

        foreach (var article in articles)
        {
            var post = PostMapper.Convert(article);

            var existing = posts.FirstOrDefault(existingPost => existingPost.DocumentId == article.DocumentId);

            if (existing == null)
            {
                _postRepository.Add(post);
            }
            else
            {
                existing.PostData = post.PostData;
                existing.PublishedAt = post.PublishedAt;
                existing.UpdatedAt = post.UpdatedAt;
                _postRepository.Update(existing);
            }
        }
        
        _dbContext.Posts.RemoveRange(postToBeDeleted);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}

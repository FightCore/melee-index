using MeleeIndex.DAL;
using MeleeIndex.Repositories.Posts;
using MeleeIndex.Repositories.Strapi;
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
    private readonly IndexDbContext  _dbContext;

    public ArticleSyncService(IArticleRepository articleRepository, IPostRepository postRepository, IndexDbContext dbContext)
    {
        _articleRepository = articleRepository;
        _postRepository = postRepository;
        _dbContext = dbContext;
    }

    public async Task Execute(CancellationToken cancellationToken = default)
    {
        for (var page = 0; page < int.MaxValue; page++)
        {
            var currentPage = await _articleRepository.Get(page, 50, cancellationToken);

            if (currentPage == null)
            {
                continue;
            }

            foreach (var article in currentPage.Data)
            {
                var post = PostMapper.Convert(article);
                _postRepository.Add(post);
            }

            await _dbContext.SaveChangesAsync(cancellationToken);
            
            // There is no more page to collect
            if (currentPage.Meta.Pagination.PageCount < 50)
            {
                break;
            }
        }
    }
}

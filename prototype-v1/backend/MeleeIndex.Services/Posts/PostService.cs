using MeleeIndex.DAL;
using MeleeIndex.Models;
using MeleeIndex.Repositories.Posts;

namespace MeleeIndex.Services.Posts;

public interface IPostService
{
    Task<List<Post>> GetAll();
    
    Task<Post?> GetById(string id);
}

internal class PostService : IPostService
{
    private readonly IndexDbContext _dbContext;
    private readonly IPostRepository _postRepository;

    public PostService(IndexDbContext dbContext, IPostRepository postRepository)
    {
        _dbContext = dbContext;
        _postRepository = postRepository;
    }

    public Task<List<Post>> GetAll()
    {
        return _postRepository.GetAll();
    }

    public Task<Post?> GetById(string id)
    {
        return _postRepository.GetById(id);
    }
}

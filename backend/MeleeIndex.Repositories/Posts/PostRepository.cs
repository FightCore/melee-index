using MeleeIndex.DAL;
using MeleeIndex.Models;
using Microsoft.EntityFrameworkCore;

namespace MeleeIndex.Repositories.Posts;

public interface IPostRepository
{
    Task<List<Post>> GetAll();

    Task<Post?> GetById(string id);
    
    void Add(Post post);
    
    void Update(Post post);
}


public class PostRepository : IPostRepository
{
    private readonly IndexDbContext _dbContext;

    public PostRepository(IndexDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task<Post?> GetById(string id)
    {
        return _dbContext.Posts.FirstOrDefaultAsync(post => post.DocumentId == id);
    }

    public Task<List<Post>> GetAll()
    {
        return _dbContext.Posts.ToListAsync();
    }

    public void Add(Post post)
    {
        _dbContext.Posts.Add(post);
    }

    public void Update(Post post)
    {
        _dbContext.Posts.Update(post);
    }
}

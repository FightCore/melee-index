using MeleeIndex.Contracts.Users;
using MeleeIndex.DAL;
using MeleeIndex.Models.Users;
using MeleeIndex.Services.Mappers;
using Microsoft.EntityFrameworkCore;

namespace MeleeIndex.Services.Users;

public interface IUserService
{
    Task<User?> GetForProvider(string provider, string providerId);

    Task<User?> Get(Guid id);

    Task<User> Create(CreateUserDto createUserDto);

    Task<User> Update(Guid id, UpdateUserModel user);
}

internal class UserService(IndexDbContext dbContext) : IUserService
{
    private readonly IndexDbContext _dbContext = dbContext;

    public Task<User?> GetForProvider(string provider, string providerId)
    {
        return _dbContext.Users.FirstOrDefaultAsync(user => user.Provider == provider && user.ProviderId == providerId);
    }

    public Task<User?> Get(Guid id)
    {
        return _dbContext.Users.FirstOrDefaultAsync(user => user.Id == id);
    }

    public async Task<User> Create(CreateUserDto createUserDto)
    {
        var user = UserMapper.FromCreateDto(createUserDto);
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();
        return user;
    }

    public async Task<User> Update(Guid id, UpdateUserModel userModel)
    {
        var user = await _dbContext.Users.FindAsync(id) ?? throw new Exception("User not found");
        user.Username = userModel.Username;
        await _dbContext.SaveChangesAsync();
        return user;
    }
}

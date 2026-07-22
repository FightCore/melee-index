using MeleeIndex.Tests.Shared.Fixtures;
using MeleeIndex.Tests.Shared.Utilities;
using MeleeIndex.Services.Users;
using MeleeIndex.Contracts.Users;

namespace MeleeIndex.Tests.Integration.Services;

public class UserServiceTests : IAsyncLifetime
{
    private readonly IndexDbFixture _fixture = new();
    private IUserService? _service;

    public async Task InitializeAsync()
    {
        await _fixture.InitializeAsync();
        _service = new UserService(_fixture.DbContext!);
    }

    public async Task DisposeAsync()
    {
        await _fixture.DisposeAsync();
    }

    [Fact]
    public async Task CreateUser_ShouldSaveUserToDatabase()
    {
        // Arrange
        var createUserDto = new CreateUserDto
        {
            Provider = "discord",
            ProviderId = "123456",
            Username = "testuser"
        };

        // Act
        var user = await _service!.Create(createUserDto);

        // Assert
        user.Should().NotBeNull();
        user.Username.Should().Be("testuser");
        user.ProviderId.Should().Be("123456");

        var savedUser = _fixture.DbContext!.Users.FirstOrDefault(u => u.Id == user.Id);
        savedUser.Should().NotBeNull();
    }

    [Fact]
    public async Task GetUser_ShouldReturnUserWhenExists()
    {
        // Arrange
        var user = TestDataBuilder.CreateUser();
        _fixture.DbContext!.Users.Add(user);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var result = await _service!.Get(user.Id);

        // Assert
        result.Should().NotBeNull();
        result!.Id.Should().Be(user.Id);
    }

    [Fact]
    public async Task UpdateUser_ShouldUpdateUserDetails()
    {
        // Arrange
        var user = TestDataBuilder.CreateUser(username: "oldusername");
        _fixture.DbContext!.Users.Add(user);
        await _fixture.DbContext.SaveChangesAsync();

        var updateUserModel = new UpdateUserModel
        {
            Username = "newusername"
        };

        // Act
        var updatedUser = await _service!.Update(user.Id, updateUserModel);

        // Assert
        updatedUser.Should().NotBeNull();
        updatedUser.Username.Should().Be("newusername");

        var dbUser = _fixture.DbContext!.Users.FirstOrDefault(u => u.Id == user.Id);
        dbUser.Should().NotBeNull();
        dbUser!.Username.Should().Be("newusername");
    }

    [Fact]
    public async Task GetUserByProvider_ShouldReturnUserWhenExists()
    {
        // Arrange
        var user = TestDataBuilder.CreateUser(discordId: "discord123");
        _fixture.DbContext!.Users.Add(user);
        await _fixture.DbContext.SaveChangesAsync();

        // Act
        var result = await _service!.GetForProvider("discord", "discord123");

        // Assert
        result.Should().NotBeNull();
        result!.Id.Should().Be(user.Id);
    }
}

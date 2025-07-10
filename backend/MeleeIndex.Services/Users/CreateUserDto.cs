namespace MeleeIndex.Services.Users
{
    public class CreateUserDto
    {
        public required string Provider { get; set; }

        public required string ProviderId { get; set; }

        public required string Username { get; set; }
    }
}

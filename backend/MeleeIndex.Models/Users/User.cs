using MeleeIndex.Models.Abstract;

namespace MeleeIndex.Models.Users
{
    public class User : IEntity
    {
        public required Guid Id { get; set; }

        public required string Provider { get; set; }

        public required string ProviderId { get; set; }

        public required bool Admin { get; set; }
    }
}

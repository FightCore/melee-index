namespace MeleeIndex.Contracts.Authors
{
    public class CreateAuthorModel
    {
        public required string Name { get; set; }

        public required string ImageUrl { get; set; }

        public string? Twitter { get; set; }

        public string? YouTube { get; set; }

        public string? Twitch { get; set; }

        public string? BlueSky { get; set; }
    }
}

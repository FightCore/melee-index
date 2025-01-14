using MeleeIndex.Contracts;

namespace MeleeIndex.GraphQL.Types
{
    [QueryType]
    public class Query
    {
        [UsePaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<PostModel> GetPosts()
        {
            return GetFakePosts();
        }


        private IQueryable<PostModel> GetFakePosts()
        {
            return new List<PostModel>
            {
            new PostModel
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Title = "Beginner's Guide to Super Smash Bros Melee",
                Summary = "Learn the basics of Melee, including movement, attacks, and game mechanics.",
                Url = new Uri("https://example.com/beginners-guide"),
                Tags = new List<string> { "Beginner", "Guide", "Game Mechanics" }
            },
            new PostModel
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Title = "Understanding Advanced Techniques in Melee",
                Summary = "A breakdown of advanced techniques like wavedashing, L-canceling, and more.",
                Url = new Uri("https://example.com/advanced-techniques"),
                Tags = new List<string> { "Advanced Techniques", "Wavedashing", "L-Canceling" }
            },
            new PostModel
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Title = "Top Melee Players of All Time",
                Summary = "An overview of the most iconic players in Melee history.",
                Url = new Uri("https://example.com/top-players"),
                Tags = new List<string> { "Top Players", "History", "Competitive" }
            },
            new PostModel
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Title = "The Evolution of the Melee Meta",
                Summary = "How the meta has changed over the years, from early days to the present.",
                Url = new Uri("https://example.com/evolution-meta"),
                Tags = new List<string> { "Meta", "History", "Competitive" }
            },
            new PostModel
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Title = "How to Practice Tech Skill in Melee",
                Summary = "Effective methods for improving your tech skill, including drills and exercises.",
                Url = new Uri("https://example.com/practice-tech-skill"),
                Tags = new List<string> { "Tech Skill", "Practice", "Improvement" }
            },
            new PostModel
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Title = "Guide to Playing Fox in Melee",
                Summary = "An in-depth guide to playing Fox, including combos, movement, and strategies.",
                Url = new Uri("https://example.com/guide-fox"),
                Tags = new List<string> { "Fox", "Character Guide", "Strategy" }
            },
            new PostModel
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Title = "Melee Tournament Etiquette",
                Summary = "Tips for participating in tournaments, from preparation to sportsmanship.",
                Url = new Uri("https://example.com/tournament-etiquette"),
                Tags = new List<string> { "Tournaments", "Etiquette", "Sportsmanship" }
            },
            new PostModel
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Title = "Frame Data Essentials for Melee",
                Summary = "Understanding frame data and its importance in high-level play.",
                Url = new Uri("https://example.com/frame-data-essentials"),
                Tags = new List<string> { "Frame Data", "Advanced", "Competitive" }
            },
            new PostModel
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Title = "The History of Melee's Competitive Scene",
                Summary = "A detailed look at the rise of Melee as a competitive esport.",
                Url = new Uri("https://example.com/history-competitive-scene"),
                Tags = new List<string> { "History", "Esports", "Competitive Scene" }
            },
            new PostModel
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Title = "Best Stages for Competitive Melee",
                Summary = "A guide to the most popular stages and how to choose them.",
                Url = new Uri("https://example.com/best-stages"),
                Tags = new List<string> { "Stages", "Competitive", "Strategy" }
            }
            }.AsQueryable();
        }
    }
}

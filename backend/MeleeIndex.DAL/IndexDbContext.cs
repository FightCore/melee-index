using MeleeIndex.Models;
using Microsoft.EntityFrameworkCore;

namespace MeleeIndex.DAL
{
    public class IndexDbContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }
        
        public DbSet<Author> Authors { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Image> Images { get; set; }

        public DbSet<Source> Sources { get; set; }

        public DbSet<Submitter> Submitters { get; set; }

        public DbSet<Tag> Tags { get; set; }
    }
}

using MeleeIndex.DAL.Configuration;
using MeleeIndex.Models;
using MeleeIndex.Models.Abstract;
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

        public IndexDbContext(DbContextOptions<IndexDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new PostConfiguration());

            var entityTypes = typeof(Post).Assembly.GetTypes()
                .Where(t => typeof(IEntity).IsAssignableFrom(t) && !t.IsAbstract);

            foreach (var type in entityTypes)
            {
                modelBuilder.Entity(type).Property(nameof(IEntity.Id))
                    .ValueGeneratedOnAdd()
                    .HasDefaultValueSql("gen_random_uuid()");
            }
        }
    }
}

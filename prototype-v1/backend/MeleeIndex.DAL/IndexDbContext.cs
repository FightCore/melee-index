using MeleeIndex.DAL.Configuration;
using MeleeIndex.Models;
using MeleeIndex.Models.Abstract;
using MeleeIndex.Models.DataEntities;
using MeleeIndex.Models.Serialization;
using MeleeIndex.Models.Users;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace MeleeIndex.DAL;

public class IndexDbContext(DbContextOptions<IndexDbContext> options) : DbContext(options)
{
    public DbSet<Post> Posts { get; set; }
    
    public DbSet<Character> Characters { get; set; }
    
    public DbSet<Category> Categories { get; set; }
    
    public DbSet<Author> Authors { get; set; }
    
    public DbSet<User> Users { get; set; }
    
    public DbSet<Bookmark> Bookmarks { get; set; }
    
    public DbSet<Source> Sources { get; set; }
    
    public DbSet<Resource> Resources { get; set; }
    
    public DbSet<CharacterGuide> CharacterGuides { get; set; }
    
    public DbSet<GlossaryItem> GlossaryItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new PostConfiguration());
        modelBuilder.ApplyConfiguration(new AuthorConfiguration());
        modelBuilder.ApplyConfiguration(new CategoryConfiguration());
        modelBuilder.ApplyConfiguration(new CharacterConfiguration());
        modelBuilder.ApplyConfiguration(new BookmarkConfiguration());
        modelBuilder.ApplyConfiguration(new SourceConfiguration());
        modelBuilder.ApplyConfiguration(new ResourceConfiguration());
        modelBuilder.ApplyConfiguration(new CharacterGuideConfiguration());
        modelBuilder.ApplyConfiguration(new GlossaryItemConfiguration());

        var entityTypes = typeof(Post).Assembly.GetTypes()
            .Where(t => typeof(IEntity).IsAssignableFrom(t) && !t.IsAbstract);

        foreach (var type in entityTypes)
        {
            modelBuilder.Entity(type).Property(nameof(IEntity.Id))
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("gen_random_uuid()");
        }

        AddPublishedAtQueryFilter<Post, PostData>(modelBuilder);
    }

    private static void AddPublishedAtQueryFilter<TEntity, TData>(ModelBuilder modelBuilder)
        where TEntity : DocumentEntity<TData>
        where TData : JsonExtendableData
    {
        modelBuilder.Entity<TEntity>().HasQueryFilter(entity => entity.PublishedAt.HasValue);
    }
}

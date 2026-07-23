using MeleeIndex.Data.Configurations;
using MeleeIndex.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace MeleeIndex.Data;

public class MeleeIndexDbContext : DbContext
{
    public DbSet<Link> Links { get; set; }
    
    public DbSet<Author> Authors { get; set; }
    
    public MeleeIndexDbContext(DbContextOptions<MeleeIndexDbContext> options) : base(options)
    {
        ChangeTracker.StateChanged += UpdateTimestamps;
        ChangeTracker.Tracked += UpdateTimestamps;
    }

    private static void UpdateTimestamps(object? sender, EntityEntryEventArgs eventArgs)
    {
        if (eventArgs.Entry.Entity is not DocumentEntity entityWithTimestamps)
        {
            return;
        } 
        switch (eventArgs.Entry.State)
        {
            case EntityState.Modified:
                entityWithTimestamps.UpdatedAt = DateTime.UtcNow;
                break;
            case EntityState.Added:
                entityWithTimestamps.CreatedAt = DateTime.UtcNow;
                entityWithTimestamps.UpdatedAt = DateTime.UtcNow;
                break;
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new LinkEntityConfiguration());
        modelBuilder.ApplyConfiguration(new AuthorEntityConfiguration());
        
        var entityTypes = typeof(Link).Assembly.GetTypes()
            .Where(t => typeof(DocumentEntity).IsAssignableFrom(t) && !t.IsAbstract);

        foreach (var type in entityTypes)
        {
            modelBuilder.Entity(type).Property(nameof(DocumentEntity.Id))
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("gen_random_uuid()");
        }
    }
}
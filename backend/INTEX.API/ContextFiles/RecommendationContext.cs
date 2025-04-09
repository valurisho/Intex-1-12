using INTEX.API.Models;
using Microsoft.EntityFrameworkCore;

namespace INTEX.API.Data;
public class RecommendationContext : DbContext
{
    public RecommendationContext(DbContextOptions<RecommendationContext> options)
        : base(options)
    {
        
    }
    
    public DbSet<ContentRecommendation> ContentRecommendations {get;set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContentRecommendation>().ToTable("content_recommendations");
        modelBuilder.Entity<ContentRecommendation>().HasKey(c => c.show_id);
    }
    
}

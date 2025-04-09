using Microsoft.EntityFrameworkCore;
using INTEX.API.Models;

namespace INTEX.API.Data
{
    public class CollaborativeRecommendationContext : DbContext
    {
        public CollaborativeRecommendationContext(DbContextOptions<CollaborativeRecommendationContext> options)
            : base(options) {}

        public DbSet<CollaborativeRecommendation> MovieRecommendations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CollaborativeRecommendation>(entity =>
            {
                entity.ToTable("movie_recommendations");

                // ✅ Define the primary key
                entity.HasKey(c => c.IfYouLiked);

                // 🔁 Map C# properties to column names (because of the spaces)
                entity.Property(c => c.Index).HasColumnName("index");
                entity.Property(c => c.IfYouLiked).HasColumnName("If you liked");
                entity.Property(c => c.Recommendation1).HasColumnName("Recommendation 1");
                entity.Property(c => c.Recommendation2).HasColumnName("Recommendation 2");
                entity.Property(c => c.Recommendation3).HasColumnName("Recommendation 3");
                entity.Property(c => c.Recommendation4).HasColumnName("Recommendation 4");
                entity.Property(c => c.Recommendation5).HasColumnName("Recommendation 5");
                entity.Property(c => c.Recommendation6).HasColumnName("Recommendation 6");
            });
        }
    }
}
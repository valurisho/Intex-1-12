using INTEX.API.Models;
using Microsoft.EntityFrameworkCore;

namespace INTEX.API.Data
{
    public class UserRecommendationDbContext : DbContext
    {
        public UserRecommendationDbContext(DbContextOptions<UserRecommendationDbContext> options)
            : base(options)
        {
        }

        public DbSet<UserRecommendations> UserRecommendations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRecommendations>() // this is the model
                .ToTable("movie_recommendations")
                .HasKey(ur => ur.user_id);

            base.OnModelCreating(modelBuilder);
        }
    }
}
using INTEX.API.Models;
using Microsoft.EntityFrameworkCore;
namespace INTEX.API.Data;
public class MovieDbContext : DbContext
{
    public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
    {
    }
    public DbSet<Movie> Movies { get; set; }
    public DbSet<Categories> Categories { get; set; }
    /*public DbSet<User> Users { get; set; }*/
    public DbSet<MovieCategories> MovieCategories { get; set; }
    
    public DbSet<MovieRating> MovieRatings { get; set; }
    
    public DbSet<User> Users { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MovieCategories>()
            .HasKey(mc => new { mc.MovieId, mc.CategoryId });

        modelBuilder.Entity<MovieCategories>()
            .HasOne(mc => mc.Movie)
            .WithMany(m => m.movieCategories)
            .HasForeignKey(mc => mc.MovieId);

        modelBuilder.Entity<MovieCategories>()
            .HasOne(mc => mc.Category)
            .WithMany(c => c.movieCategories)
            .HasForeignKey(mc => mc.CategoryId);
        
        // ✅ ADD this config to register the composite key
        modelBuilder.Entity<MovieRating>()
            .HasKey(mr => new { mr.UserId, mr.ShowId });
        
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("movies_users");

            entity.HasKey(u => u.UserId);

            entity.Property(u => u.UserId).HasColumnName("user_id");
            entity.Property(u => u.Name).HasColumnName("name");
            entity.Property(u => u.Phone).HasColumnName("phone");
            entity.Property(u => u.Email).HasColumnName("email");
            entity.Property(u => u.Age).HasColumnName("age");
            entity.Property(u => u.Gender).HasColumnName("gender");
        });
        
    }
    
    
}
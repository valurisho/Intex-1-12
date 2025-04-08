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
    }
}
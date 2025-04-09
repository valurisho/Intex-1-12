namespace INTEX.API.Data;
using INTEX.API.Models;
using Microsoft.EntityFrameworkCore;

public class GenreRecommendationsContext : DbContext
{
    public GenreRecommendationsContext(DbContextOptions<GenreRecommendationsContext> options) : base(options) { }

    public DbSet<Comedy> Comedy { get; set; }
    public DbSet<Adventure> Adventure { get; set; }
    public DbSet<Dramas> Dramas { get; set; }
    public DbSet<Family> Family { get; set; }
    public DbSet<HorrorThrillers> Horror_Thrillers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Comedy>().ToTable("Comedy").HasKey(x => x.user_id);
        modelBuilder.Entity<Adventure>().ToTable("Adventure").HasKey(x => x.user_id);
        modelBuilder.Entity<Dramas>().ToTable("Dramas").HasKey(x => x.user_id);
        modelBuilder.Entity<Family>().ToTable("Family").HasKey(x => x.user_id);
        modelBuilder.Entity<HorrorThrillers>().ToTable("Horror_Thrillers").HasKey(x => x.user_id);
    }
}
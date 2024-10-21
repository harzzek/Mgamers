using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure;

public class ApplicationDbContext : IdentityDbContext<User, Role, int>
{ 
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // Define your DbSets (tables)
    // public DbSet<YourEntity> YourEntities { get; set; }

    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Event> Events { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<Event>()
            .HasMany(e => e.Registrations)
            .WithMany(u => u.RegistratedEvents)
            .UsingEntity(j => j.ToTable("registrations"));

        modelBuilder.Entity<User>()
            .HasMany(u => u.RegistratedEvents)
            .WithMany(e => e.Registrations)
            .UsingEntity(j => j.ToTable("registrations"));

        base.OnModelCreating(modelBuilder);
    }
}

using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
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
    public DbSet<Table> Tables { get; set; }
    public DbSet<Seat> Seats { get; set; }
    public DbSet<Registration> Registrations { get; set; }
    public DbSet<NewsPost> NewsPosts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<Registration>()
            .HasKey(r => new { r.UserId, r.EventId, r.SeatId });

        modelBuilder.Entity<Registration>()
            .HasOne(r => r.User)
            .WithMany(u => u.Registrations)
            .HasForeignKey(u => u.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Registration>()
            .HasOne(r => r.Event)
            .WithMany(e => e.Registrations)
            .HasForeignKey(e => e.EventId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Registration>()
            .HasOne(r => r.Seat)
            .WithOne(s => s.Registration)
            .HasForeignKey<Registration>(r => r.SeatId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Seat>()
            .HasOne(s => s.Table)
            .WithMany(t => t.Seats)
            .HasForeignKey(s => s.TableId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Event>()
            .HasMany(e => e.Tables)
            .WithOne(t => t.Event)
            .HasForeignKey(t => t.EventId)
            .IsRequired();

        modelBuilder.Entity<Event>()
            .Property(e => e.StartDate)
            .HasColumnType("timestamp");

        modelBuilder.Entity<Event>()
            .Property(e => e.EndDate)
            .HasColumnType("timestamp");

        modelBuilder.Entity<Registration>()
            .HasIndex(r => r.SeatId)
            .IsUnique();

        modelBuilder.Entity<NewsPost>(entity =>
        {
            entity.ToTable("newspost");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Letter).HasColumnName("letter");
            entity.Property(e => e.Creator).HasColumnName("creator_id");

            entity.Property(e => e.CreatedAt)
                .HasColumnName("created_at")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(e => e.CreatorUser)
                .WithMany()
                .HasForeignKey(e => e.Creator)
                .OnDelete(DeleteBehavior.Cascade);
        });
        base.OnModelCreating(modelBuilder);
    }
}

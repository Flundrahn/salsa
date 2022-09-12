using Microsoft.EntityFrameworkCore;
using salsa.api.Models;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
    }

    public DbSet<Topic> Topics { get; set; } = default!;
    public DbSet<Resource> Resources { get; set; } = default!;
    public DbSet<Week> Weeks { get; set; }
    public DbSet<Course> Courses { get; set; }
}

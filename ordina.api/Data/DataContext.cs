using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ordina.api.Models;

public class DataContext : DbContext
{
  public DataContext(DbContextOptions<DataContext> options)
      : base(options)
  {
  }

  public DbSet<Topic> Topics { get; set; } = default!;
  public DbSet<Resource> Resources { get; set; } = default!;
  public DbSet<Week> Weeks { get; set; }
}

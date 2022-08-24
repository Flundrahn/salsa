using Microsoft.EntityFrameworkCore;
using salsa.api.Services;

namespace salsa.api.Data;

public static class SeedData
{
    public static async Task Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new DataContext(
            serviceProvider.GetRequiredService<
                DbContextOptions<DataContext>>()))
        {

            if (context.Weeks.Any())
            {
                return;   // DB has already been seeded
            }

            var fileReader = new FileReader($"{Directory.GetCurrentDirectory()}/Data/", "DNFS - Student Schedule.csv"); // TODO Make sure this path is working

            var weeks = fileReader.CreateWeeks();

            foreach (var week in weeks)
            {
                context.Weeks.Add(week);
            }

            await context.SaveChangesAsync();

            context.SaveChanges();
        }
    }
}
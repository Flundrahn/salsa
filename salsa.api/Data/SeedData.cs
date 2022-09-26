using Microsoft.EntityFrameworkCore;
using salsa.api.Services;

namespace salsa.api.Data;

public static class SeedData
{
    public static async Task Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new DataContext(
            serviceProvider.GetRequiredService<
                DbContextOptions<DataContext>>()
        ))
        {
            if (context.Weeks.Any())
            {
                return;
            }

            var reader = new ScheduleReader(
                $"{Directory.GetCurrentDirectory()}./Database/", "DNFS - Student Schedule.csv"
            );

            var weeks = reader.CreateWeeks();

            foreach (var week in weeks)
            {
                context.Weeks.Add(week);
            }

            await context.SaveChangesAsync();
        }
    }
}
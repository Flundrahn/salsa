using Microsoft.EntityFrameworkCore;
using ordina.api.Services;

namespace ordina.api.Data;

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

            var fileReader = new FileReader("/Users/saltdev/Documents/final-project/ordina/ordina.api/Data/", "DNFS - Student Schedule.csv");

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
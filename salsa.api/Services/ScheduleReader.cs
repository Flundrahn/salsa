using System.Globalization;
using CsvHelper;
using salsa.api.Models;

namespace salsa.api.Services;

public class ScheduleReader
{
    private string _path;

    public ScheduleReader(string fileDirectory, string fileName)
    {
        _path = Path.Join(fileDirectory, fileName);
    }

    public Week[] CreateWeeks()
    {
        using (var reader = new StreamReader(_path))
        using (var csv = new CsvReader(reader, CultureInfo.CurrentCulture))
        {
            var anonymousType = new
            {
                WeekNumber = default(int),
                WeekTitle = string.Empty,
                Date = default(DateTime),
                DayNumber = default(int),
                DayTitle = string.Empty,
            };

            var records = csv.GetRecords(anonymousType);
            return records.GroupBy(r => r.WeekNumber)
                .Select(g => new Week
                {
                    WeekNumber = g.Key,
                    StartingDate = g.First().Date,
                    Title = g.First().WeekTitle,
                    Topics = g.Select(r => new Topic
                    {
                        Day = r.DayNumber,
                        Date = r.Date,
                        Title = r.DayTitle,
                    }).ToArray()
                }).ToArray();
        }
    }
}

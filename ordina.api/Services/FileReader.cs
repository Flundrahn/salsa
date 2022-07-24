using ordina.api.Models;

namespace ordina.api.Services;

public class FileReader
{
    public string _path { get; }
    // public static IRepository _repository;

    public FileReader(string fileDirectory, string fileName)
    // public FileReader(string fileDirectory, string fileName, IRepository repository)
    {
        _path = Path.Join(fileDirectory, fileName);
        // _repository = repository;
    }
    public IEnumerable<Topic> CreateTopics()
    {
        var day = 0;
        string headers;

        using (var reader = new StreamReader(_path))
        {
            headers = reader.ReadLine();

            while (!reader.EndOfStream)
            {
                day += 1;
                var line = reader.ReadLine(); // Course week,Week Info,Date,Day,Info
                var values = line.Split(","); // BUG split csv by comma, problem when string contains comma!

                if (!int.TryParse(values[0], out int weekNumber))
                {
                    throw new Exception("Course week was not an integer");
                }

                yield return new Topic
                {
                    Title = values[4],
                    WeekId = weekNumber,
                    Day = day,
                };
            }
        }
    }

    public IEnumerable<Week> CreateWeeks()
    {
        var topics = CreateTopics();

        return topics.GroupBy(t => t.WeekId).Select(g => new Week
        {
            Title = "weekTitle",
            WeekNumber = g.Key.GetValueOrDefault(),
            Topics = g.ToArray()
        });
    }

    // public async Task<bool> WriteWeeks()
    // {
    //     var weeks = CreateWeeks();
    //     Week response = null;
    //     try
    //     {
    //         foreach (var week in weeks)
    //         {
    //             response = await _repository.CreateWeek(week);
    //         }
    //         return true;
    //     }
    //     catch
    //     {
    //         return false;
    //     }

    // }
}

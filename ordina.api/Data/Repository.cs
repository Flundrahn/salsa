using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ordina.api.Models;
using ordina.api.Services;

public class Repository : IRepository
{
    private DataContext _context;
    private IMapper _mapper;
    private DateProvider _dateProvider;

    public Repository(DataContext context, IMapper mapper, DateProvider dateProvider)
    {
        _context = context;
        _mapper = mapper;
        _dateProvider = dateProvider;
    }

    public async Task<Week> CreateWeek(Week week)
    {
        var savedEntry = _context.Weeks.Add(week);
        await _context.SaveChangesAsync();
        return savedEntry.Entity;
    }

    public async Task<Topic> CreateTopic(Topic topic)
    {
        if (topic.WeekId.HasValue && !WeekExists(topic.WeekId.Value))
            throw new KeyNotFoundException("Week not found.");
        var savedEntry = _context.Topics.Add(topic);
        await _context.SaveChangesAsync();
        return savedEntry.Entity;
    }

    public async Task<Resource> CreateResource(Resource resource)
    {
        if (resource.TopicId.HasValue && !TopicExists(resource.TopicId.Value))
            throw new KeyNotFoundException("Topic not found.");
        if (!ResourceTypeExists(resource))
            throw new KeyNotFoundException("Resource type not found.");
        return await SaveResource(resource);
    }

    private async Task<Resource> SaveResource(Resource resource)
    {
        var savedEntry = _context.Resources.Add(resource);
        await _context.SaveChangesAsync();
        return savedEntry.Entity;
    }

    // TODO LATER: functionality to add multiple resources
    //
    // public async Task<IEnumerable<Resource>> CreateResources(IEnumerable<Resource> resources)
    // {
    //     List<Resource> savedResources = new List<Resource>();
    //     foreach(var resource in resources)
    //     {
    //         savedResources.Add(await CreateResource(resource));
    //     }
    //     return savedResources;
    // }

    public async Task<Topic> FindTopic(int id)
    {
        return await _context.Topics
                    .Where(topic => topic.TopicId.Value == id)
                    .Include("Resources")
                    .FirstOrDefaultAsync();
    }

    public async Task<Resource> FindResource(int id)
    {
        return await _context.Resources
                    .Where(resource => resource.ResourceId.Value == id)
                    .FirstOrDefaultAsync();
    }

    public async Task<Week> FindWeek(int id)
    {
        return await _context.Weeks
                    .Where(week => week.WeekId.Value == id)
                    .Include(week => week.Topics)
                    .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Resource>> FindResources(ResourceType resourceType)
    {
        return await _context.Resources
                    .Where(resource => resource.ResourceType == resourceType)
                    .ToListAsync();
    }

    public async Task<IEnumerable<Topic>> FindTopics()
    {
        return await _context.Topics.ToListAsync();
    }

    public async Task<IEnumerable<Week>> GetWeeks()
    {
        return await _context.Weeks
        .Include(week => week.Topics //.Select(t => _mapper.Map<TopicResp>(t)).OrderBy(topic => topic.Day)
        ).ToListAsync();
    }

    public async Task<Topic> ReplaceTopic(Topic topic)
    {
        if (!TopicExists((int)topic.TopicId))
            throw new KeyNotFoundException("Topic not found.");
        if (topic.WeekId.HasValue && !WeekExists(topic.WeekId.Value))
            throw new KeyNotFoundException("Week not found.");

        _context.Entry(topic).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return _context.Entry(topic).Entity;
    }

    public async Task<Resource> ReplaceResource(Resource resource)
    {
        if (resource.TopicId.HasValue && !TopicExists(resource.TopicId.Value))
            throw new KeyNotFoundException("Topic not found.");
        if (!ResourceTypeExists(resource))
            throw new KeyNotFoundException("Resource type not found.");
        _context.Entry(resource).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return _context.Entry(resource).Entity;
    }

    private bool TopicExists(int id)
    => (_context.Topics?.Any(e => e.TopicId == id)).GetValueOrDefault();

    private bool WeekExists(int id)
    => (_context.Weeks?.Any(e => e.WeekId == id)).GetValueOrDefault();

    private bool ResourceTypeExists(Resource resource)
    => resource.ResourceType >= 0 && resource.ResourceType <= Enum.GetValues(typeof(ResourceType)).Cast<ResourceType>().Last();

    public Task<Topic> GetDailyTopic()
    {
        int day = GetCurrentDay();
        return GetTopicByDay(day);
    }

    private int GetCurrentDay()
    {
        var curWeekDate = _dateProvider.GetCurrentDate().Date;

        if (curWeekDate.DayOfWeek == DayOfWeek.Saturday)
            curWeekDate = curWeekDate.AddDays(-1);
        if (curWeekDate.DayOfWeek == DayOfWeek.Sunday)
            curWeekDate = curWeekDate.AddDays(-2);

        var daysDiff = (int)(curWeekDate - GetCurrentCourseStartDate()).TotalDays;

        return subtractWeekends(daysDiff);
    }

    private int subtractWeekends(int days)
    => days - (days / 7 * 2) + 1;

    private Task<Topic> GetTopicByDay(int day)
    {
        return _context.Topics
                    .Where(topic => topic.Day == day)
                    .Include("Resources")
                    .FirstOrDefaultAsync();
    }

    public Task<Course> FindCourse(int id)
    {
        return _context.Courses
                    .Where(course => course.CourseId.Value == id)
                    .FirstOrDefaultAsync();
    }

    public async Task<Course> CreateCourse(Course course)
    {
        var savedEntry = _context.Courses.Add(course);
        await _context.SaveChangesAsync();
        return savedEntry.Entity;
    }

    public DateTime GetCurrentCourseStartDate()
    {
        var course = _context.Courses.FirstOrDefault();
        if (course == null)
        {
            throw new KeyNotFoundException("Course not found.");
        }
        return course.StartDate;
    }
}
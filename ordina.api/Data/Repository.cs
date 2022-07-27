using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ordina.api.Models;
using ordina.api.Models.DTOs;
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
        // NOTE Now that updated CreateTopic does not have a WeekId, this guard clause should be uneccessary 
        // if (topic.WeekId.HasValue && !WeekExists(topic.WeekId.Value))
        //     throw new KeyNotFoundException("Week not found.");

        var weekNumber = topic.Day / 5 + 1;

        try
        {
            topic.WeekId = await _context.Weeks
            .Where(w => w.WeekNumber == weekNumber)
            .Select(w => w.WeekId)
            .FirstAsync();
        }
        catch (Exception)
        {
            throw new KeyNotFoundException("No week exists for this day");
        }

        var savedEntry = _context.Topics.Add(topic);
        await _context.SaveChangesAsync();
        return savedEntry.Entity;
    }

    public async Task<Resource> CreateResource(CreateResource dto)
    {
        if (!ResourceTypeExists(dto.ResourceType))
            throw new KeyNotFoundException("Resource type not found.");
        var topicId = GetTopicId(dto.TopicDay);
        if (topicId == null)
            throw new KeyNotFoundException("Topic for day " + dto.TopicDay + " not found.");

        var entityToPersist = _mapper.Map<Resource>(dto);
        entityToPersist.TopicId = topicId;
        return await SaveResource(entityToPersist);
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

    public async Task<Topic> FindTopicByDay(int day)
    {
        return await _context.Topics
                    .Where(topic => topic.Day.Value == day)
                    .FirstOrDefaultAsync();
    }

    public async Task<ResourceResponse> FindResource(int id)
    {
        return await _context.Resources
                    .Where(r => r.ResourceId.Value == id)
                    .Select(r =>
                        new ResourceResponse
                        {
                            ResourceType = r.ResourceType,
                            Title = r.Title,
                            Link = r.Link,
                            TopicId = (int)r.TopicId,
                            TopicDay = (int)_context.Topics
                                .Where(t => t.TopicId == r.TopicId)
                                .FirstOrDefault().Day,
                        }
                    ).FirstOrDefaultAsync();
    }

    public async Task<Week> FindWeek(int id)
    {
        return await _context.Weeks
                    .Where(week => week.WeekId.Value == id)
                    .Include(week => week.Topics)
                    .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<ResourceResponse>> FindResources(ResourceType resourceType)
    {
        return await _context.Resources
                    .Where(r => r.ResourceType == resourceType)
                    .Select(r =>
                        new ResourceResponse
                        {
                            ResourceType = r.ResourceType,
                            Title = r.Title,
                            Link = r.Link,
                            TopicId = (int)r.TopicId,
                            TopicDay = (int)_context.Topics.Where(t => t.TopicId == r.TopicId).FirstOrDefault().Day,
                        }
                    ).ToListAsync();
    }

    public async Task<IEnumerable<Topic>> FindTopics()
    {
        return await _context.Topics.ToListAsync();
    }

    public async Task<IEnumerable<Week>> GetWeeks()
    {
        return await _context.Weeks
        .OrderBy(w => w.WeekNumber)
        .Include(week => week.Topics.OrderBy(t => t.Day))
        .ToListAsync();
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

    public async Task<ResourceResponse> ReplaceResource(EditResource dto)
    {
        var topic = await FindTopicByDay(dto.TopicDay);

        if (topic == null)
            throw new KeyNotFoundException("Topic not found.");

        if (!ResourceTypeExists(dto.ResourceType))
            throw new KeyNotFoundException("Resource type not found.");

        var resource = _mapper.Map<Resource>(dto);
        
        resource.TopicId = topic.TopicId;

        _context.Entry(resource).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        var resourceResponse = _mapper.Map<ResourceResponse>(_context.Entry(resource).Entity);

        resourceResponse.TopicDay = (int)dto.TopicDay;

        return resourceResponse;
    }

    public bool TopicExists(int id)
    => (_context.Topics?.Any(e => e.TopicId == id)).GetValueOrDefault();

    public bool TopicExists(Topic topic)
    => (_context.Topics?.Any(e => e.Day == topic.Day)).GetValueOrDefault();

    public bool WeekExists(int id)
    => (_context.Weeks?.Any(e => e.WeekId == id)).GetValueOrDefault();

    public bool WeekExists(Week week)
    => (_context.Weeks?.Any(e => e.WeekNumber == week.WeekNumber)).GetValueOrDefault();

    private bool ResourceTypeExists(ResourceType resourceType)
    => resourceType >= 0 && resourceType <= Enum.GetValues(typeof(ResourceType)).Cast<ResourceType>().Last();

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

    public int? GetTopicId(int topicDay)
    => _context.Topics.Where(topic => topic.Day == topicDay).Select(topic => topic.TopicId).FirstOrDefault();

}
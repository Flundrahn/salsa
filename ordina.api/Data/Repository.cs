using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ordina.api.Models;
using ordina.api.Models.DTOs;

public class Repository : IRepository
{
    public DataContext _context;
    public IMapper _mapper;
    public Repository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
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
        if(topic.WeekId.HasValue && !WeekExists(topic.WeekId.Value))
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
    => resource.ResourceType > 0 && resource.ResourceType <= Enum.GetValues(typeof(ResourceType)).Cast<ResourceType>().Last();

}
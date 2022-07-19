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

    public async Task<Topic> FindTopic(int id)
    {
        return await _context.Topics
                    .Where(topic => topic.TopicId.Value == id)
                    .Include("Resources")
                    .FirstOrDefaultAsync();
    }

    public async Task<Week> FindWeek(int id)
    {
        return await _context.Weeks
                    .Where(week => week.WeekId.Value == id)
                    .Include(week => week.Topics)
                    .FirstOrDefaultAsync();
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

    public async Task<Topic> ReplaceEntity(Topic topic)
    {
        if(topic.WeekId.HasValue && !WeekExists(topic.WeekId.Value))
            throw new KeyNotFoundException("Week not found.");
        _context.Entry(topic).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return _context.Entry(topic).Entity;
    }

    private bool TopicExists(int id)
    => (_context.Topics?.Any(e => e.TopicId == id)).GetValueOrDefault();

    private bool WeekExists(int id)
    => (_context.Weeks?.Any(e => e.WeekId == id)).GetValueOrDefault();

}
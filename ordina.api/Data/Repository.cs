using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ordina.api.Models;

public class Repository : IRepository
{
    public DataContext _context;
    public Repository(DataContext context)
    => _context = context;

    public async Task<Topic> CreateTopic(Topic topic)
    {
        validateDbSet();
        var savedEntry = _context.Topics.Add(topic);
        await _context.SaveChangesAsync();
        return savedEntry.Entity;
    }

    public async Task<Topic> FindTopic(int id)
    {
        validateDbSet();
        return await _context.Topics
                    .Where(topic => topic.TopicId.Value == id)
                    .Include("Resources")
                    .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Topic>> GetTopics()
    {
        validateDbSet();
        return await _context.Topics.ToListAsync();
    }

    public async Task ReplaceEntity(EditTopic dto)
    {
        validateDbSet();
        if (!TopicExists(dto.Id)) throw new KeyNotFoundException();
        _context.Entry(dto).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    private bool TopicExists(int id)
    => (_context.Topics?.Any(e => e.TopicId == id)).GetValueOrDefault();

    private void validateDbSet()
    {
        if (_context.Topics == null) throw new Exception();
    }

}
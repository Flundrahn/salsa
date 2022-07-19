using Microsoft.AspNetCore.Mvc;
using ordina.api.Models;

public interface IRepository
{
    Task<IEnumerable<Week>> GetWeeks();
    Task<IEnumerable<Topic>> FindTopics();
    Task<Topic> FindTopic(int id);
    Task<Topic> ReplaceEntity(Topic topic);
    Task<Topic> CreateTopic(Topic topic);
    Task<Week> FindWeek(int id);
}
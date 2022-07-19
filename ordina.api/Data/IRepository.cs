using Microsoft.AspNetCore.Mvc;
using ordina.api.Models;
using Type = ordina.api.Models.Type;

public interface IRepository
{
    Task<IEnumerable<Week>> GetWeeks();
    Task<IEnumerable<Topic>> FindTopics();
    Task<IEnumerable<Resource>> FindResources(Type type);
    Task<Topic> FindTopic(int id);
    Task<Resource> FindResource(int id);
    Task<Topic> ReplaceTopic(Topic topic);
    Task<Resource> ReplaceResource(Resource resource);
    Task<Topic> CreateTopic(Topic topic);
    Task<Resource> CreateResource(Resource resource);
    Task<Week> FindWeek(int id);
}
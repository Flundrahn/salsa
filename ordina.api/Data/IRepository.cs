using Microsoft.AspNetCore.Mvc;
using ordina.api.Models;

public interface IRepository
{
    Task<IEnumerable<Topic>> GetTopics();
    Task<Topic> FindTopic(int id);
    Task ReplaceEntity(EditTopic dto);
    Task<Topic> CreateTopic(Topic topic);
}
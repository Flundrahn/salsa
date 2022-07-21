using Microsoft.AspNetCore.Mvc;
using ordina.api.Models;

public interface IRepository
{
    Task<IEnumerable<Week>> GetWeeks();
    Task<IEnumerable<Topic>> FindTopics();
    Task<IEnumerable<Resource>> FindResources(ResourceType resourceType);
    Task<Topic> FindTopic(int id);
    Task<Resource> FindResource(int id);
    Task<Topic> ReplaceTopic(Topic topic);
    Task<Resource> ReplaceResource(Resource resource);
    Task<Topic> CreateTopic(Topic topic);
    Task<Resource> CreateResource(Resource resource);
    // Task<IEnumerable<Resource>> CreateResources(IEnumerable<Resource> resources);
    Task<Week> FindWeek(int id);
    Task<Course> FindCourse(int id);
    Task<Topic> GetDailyTopic();
    Task<Course> CreateCourse(Course course);

    DateTime GetCurrentCourseStartDate();
}
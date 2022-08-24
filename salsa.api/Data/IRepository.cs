using Microsoft.AspNetCore.Mvc;
using salsa.api.Models;
using salsa.api.Models.DTOs;

public interface IRepository
{
    Task<Week> CreateWeek(Week week);
    Task<IEnumerable<Week>> GetWeeks();
    Task<IEnumerable<Topic>> FindTopics();
    Task<IEnumerable<ResourceResponse>> FindResources(ResourceType resourceType);
    Task<Topic> FindTopic(int id);
    Task<ResourceResponse> FindResource(int id);
    Task<Topic> ReplaceTopic(Topic topic);
    Task<ResourceResponse> ReplaceResource(EditResource dto);
    Task<Topic> CreateTopic(Topic topic);
    Task<Resource> CreateResource(CreateResource resource);
    // Task<IEnumerable<Resource>> CreateResources(IEnumerable<Resource> resources); // TODO LATER
    Task<Week> FindWeek(int id);
    Task<Course> FindCourse(int id);
    Task<Topic> GetDailyTopic();
    Task<Course> CreateCourse(Course course);
    DateTime GetCurrentCourseStartDate();
    bool TopicExists(int id);
    bool TopicExists(Topic topic);
    bool WeekExists(int id);
    bool WeekExists(Week week);
}
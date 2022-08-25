using Microsoft.AspNetCore.Mvc;
using salsa.api.Models;
using salsa.api.Models.DTOs;

public interface IRepository
{
    Task<Week> CreateWeek(Week week);
    Task<IEnumerable<Week>> GetWeeks();
    Task<Week> FindWeek(int id);
    Task<Topic> FindTopic(int id);
    Task<IEnumerable<Topic>> FindTopics();
    Task<Topic> GetDailyTopic();
    Task<ResourceResponse> FindResource(int id);
    Task<Topic> ReplaceTopic(Topic topic);
    Task<Topic> CreateTopic(Topic topic);
    Task<IEnumerable<ResourceResponse>> FindResources(ResourceType resourceType);
    Task<IEnumerable<ResourceResponse>> GetResources();
    Task<ResourceResponse> ReplaceResource(EditResource dto);
    Task<Resource> CreateResource(CreateResource resource);
    // Task<IEnumerable<Resource>> CreateResources(IEnumerable<Resource> resources); // TODO LATER
    Task<Course> FindCourse(int id);
    Task<Course> CreateCourse(Course course);
    DateTime GetCurrentCourseStartDate();
    bool TopicExists(int id);
    bool TopicExists(Topic topic);
    bool WeekExists(int id);
    bool WeekExists(Week week);
}
using AutoMapper;
using salsa.api.Models;
using salsa.api.Models.DTOs;

public class Mapper : Profile
{
    public Mapper()
    {
        CreateMap<EditTopic, Topic>();
        CreateMap<EditResource, Resource>();
        CreateMap<CreateCourse, Course>();
        CreateMap<CreateTopic, Topic>();
        CreateMap<CreateResource, Resource>();
        CreateMap<Resource, ResourceResponse>();
        CreateMap<Week, WeekExtResp>();
        CreateMap<CreateWeek, Week>();
        CreateMap<Topic, TopicResp>();
    }
}
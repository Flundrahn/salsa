using AutoMapper;
using ordina.api.Models;
using ordina.api.Models.DTOs;

public class Mapper : Profile
{
    public Mapper()
    {
        CreateMap<EditTopic, Topic>();
        CreateMap<EditResource, Resource>();
        CreateMap<CreateCourse, Course>();
        CreateMap<CreateTopic, Topic>();
        CreateMap<CreateResource, Resource>();
        // CreateMap<IEnumerable<CreateResource>, IEnumerable<Resource>>();
        CreateMap<Week, WeekExtResp>();
        CreateMap<CreateWeek, Week>();
        CreateMap<Topic, TopicResp>();
    }
}
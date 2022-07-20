using AutoMapper;
using ordina.api.Models;
using ordina.api.Models.DTOs;

public class Mapper : Profile
{
    public Mapper()
    {
        CreateMap<EditTopic, Topic>();
        CreateMap<EditResource, Resource>();
        CreateMap<CreateTopic, Topic>();
        CreateMap<CreateResource, Resource>();
        // CreateMap<IEnumerable<CreateResource>, IEnumerable<Resource>>();
        CreateMap<Week, WeekExtResp>();
        CreateMap<Topic, TopicResp>();
    }
}
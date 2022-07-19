using AutoMapper;
using ordina.api.Models;
using ordina.api.Models.DTOs;

public class Mapper : Profile
{
    public Mapper()
    {
        CreateMap<EditTopic, Topic>();
        CreateMap<CreateTopic, Topic>();
        CreateMap<Week, WeekExtResp>();
        CreateMap<Topic, TopicResp>();
    }
}
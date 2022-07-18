using AutoMapper;
using ordina.api.Models;

public class Mapper : Profile
{
    public Mapper()
    {
        CreateMap<EditTopic, Topic>();
        
    }
}
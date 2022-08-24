using Moq;
using AutoMapper;
using salsa.api.Services;

namespace salsa.tests;

public class RepositoryTests
{
    private IRepository _repository;
    private Mock<DateProvider> _dateProvider;
    public RepositoryTests()
    {
        var mappingConfig = new MapperConfiguration(config =>
        {
            config.AddProfile(new Mapper());
        });
        _dateProvider = new Mock<DateProvider>();

        _repository = new Repository(null, mappingConfig.CreateMapper(), _dateProvider.Object);
    }

    public void should_find_course_day()
    {
        _dateProvider.Setup(_dateProvider => _dateProvider.GetCurrentDate())
            .Returns(new DateTime(2022, 5, 6));
        // TODO mock data context
    }
}
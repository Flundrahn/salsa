using FluentAssertions;
using salsa.api.Services;
using AutoMapper;

namespace salsa.tests;

public class FileReaderTests
{
    public FileReaderTests()
    {
        var mappingConfig = new MapperConfiguration(config =>
        {
            config.AddProfile(new Mapper());
        });
    }

    [Fact]
    public void should_create_topics()
    {
        // Arrange
        var fileReader = new FileReader($"{Environment.CurrentDirectory}/Database", "DNFS - Student Schedule.csv");

        // Act
        var topics = fileReader.CreateTopics();
        var topicsArray = topics.ToArray();

        // Assert
        topicsArray.Should().NotBeEmpty();
    }
    [Fact]
    public void should_create_weeks()
    {
        // Arrange
        var fileReader = new FileReader($"{Environment.CurrentDirectory}/Database", "DNFS - Student Schedule.csv");
        // Act
        var weeks = fileReader.CreateWeeks().ToArray();

        // Assert
        weeks.Should().NotBeEmpty();
    }
}
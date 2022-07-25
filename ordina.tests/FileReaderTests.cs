using ordina.api.Models;
using ordina.api.Data;
using FluentAssertions;
using Moq;
using ordina.api.Services;
using AutoMapper;

namespace ordina.tests;

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
        var fileReader = new FileReader($"{Environment.CurrentDirectory}../../../../../ordina.api/Data", "DNFS - Student Schedule.csv");

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
        var fileReader = new FileReader($"{Environment.CurrentDirectory}../../../../../ordina.api/Data", "DNFS - Student Schedule.csv");

        // Act
        var weeks = fileReader.CreateWeeks().ToArray();

        // Assert
        weeks.Should().NotBeEmpty();
    }
}
using ordina.api.Models;
using ordina.api.Data;
using FluentAssertions;
using Moq;
using ordina.api.Services;
using AutoMapper;

namespace ordina.tests;

public class FileReaderTests
{
    // private IRepository _repository;
    // private Mock<DateProvider> _dateProvider;

    public FileReaderTests()
    {
        var mappingConfig = new MapperConfiguration(config =>
        {
            config.AddProfile(new Mapper());
        });
        // _dateProvider = new Mock<DateProvider>();

        // _repository = new Repository(null, mappingConfig.CreateMapper(), _dateProvider.Object);
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

    // [Fact]
    // public void repository_should_create_week()
    // {
    //     // Arrange
    //     var week = new Week
    //     {
    //         WeekId = 3,
    //         Title = "Test title",
    //         WeekNumber = 1,
    //     };
    //     // Act
    //     var response = _repository.CreateWeek(week);

    //     // Assert
    //     response.Should().NotBeNull();
    // }

    [Fact]
    public async Task should_write_weeks_to_database()
    {
        // Arrange
        var fileReader = new FileReader($"{Environment.CurrentDirectory}../../../../../ordina.api/Data", "DNFS - Student Schedule.csv");

        // Act
        var response = fileReader.WriteWeeks();


        // Assert
        response.Should().Be(true);
    }

    // [Fact]
    // public async Task should_write_weeks_to_database()
    // {
    //     // Arrange
    //     var fileReader = new FileReader($"{Environment.CurrentDirectory}../../../../../ordina.api/Data", "DNFS - Student Schedule.csv");

    //     // Act
    //     var weeks = fileReader.CreateWeeks().ToArray();

    //     Week response = null;
    //     foreach (var week in weeks)
    //     {
    //         response = await _repository.CreateWeek(week);
    //     }

    //     // Assert
    //     response.Should().BeOfType<Week>();
    // }

    // [Fact]
    // public async Task should_write_topic_to_database()
    // {
    //     // Arrange
    //     var fileReader = new FileReader($"{Environment.CurrentDirectory}../../../../../ordina.api/Data", "DNFS - Student Schedule.csv");

    //     // Act
    //     var topics = fileReader.CreateTopics();
    //     var topic = topics.ToArray();


    //     // foreach (var topic in topics)
    //     // {
    //     var createdTopic = await _repository.CreateTopic(topic[0]);
    //     // }
    //     // Assert
    //     topic.Should().NotBeNull();
    //     // createdTopic.Should().NotBeNull();
    // }
}
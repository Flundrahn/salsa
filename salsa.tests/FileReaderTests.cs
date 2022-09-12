using FluentAssertions;
using salsa.api.Services;
using AutoMapper;

namespace salsa.tests;

public class FileReaderTests
{
    [Fact]
    public void should_read_csv()
    {
        // Arrange
        var fileReader = new ScheduleReader($"{Environment.CurrentDirectory}/Database", "DNFS - Student Schedule.csv");

        // Act
        var weeks = fileReader.CreateWeeks();

        // Assert
        weeks.Should().NotBeEmpty();
    }

    [Fact]
    public void should_return_correct_weeks()
    {
        // Arrange
        var fileReader = new ScheduleReader($"{Environment.CurrentDirectory}/Database", "DNFS - Student Schedule.csv");

        // Act
        var weeks = fileReader.CreateWeeks();

        // Assert
        weeks[0].Title.Should().Be("Introduction week 1");
        weeks[0].StartingDate.Should().Be(new DateTime(2022, 5, 2));
    }

    [Fact]
    public void should_return_correct_topics()
    {
        // Arrange
        var fileReader = new ScheduleReader($"{Environment.CurrentDirectory}/Database", "DNFS - Student Schedule.csv");

        // Act
        var weeks = fileReader.CreateWeeks();

        // Assert
        weeks[0].Topics.Should().NotBeNull();
        weeks[0].Topics!.First().Day.Should().Be(1);
        weeks[0].Topics!.First().Date.Should().Be(new DateTime(2022, 5, 2));
        weeks[0].Topics!.First().Title.Should().Be("Introduction day / Tools of our stack");
    }
}

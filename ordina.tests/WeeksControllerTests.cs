using System.Collections.Generic;
using System.Threading.Tasks;
using ordina.api.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using ordina.api.Models;
using AutoMapper;
using ordina.api.Models.DTOs;

namespace ordina.tests;

public class WeeksControllerTests
{
    private static WeeksController _controller;
    private Mock<IRepository> _repo;
    private static IMapper _mapper;

    private static readonly Week MOCK_WEEK_1 = new Week
    {
        WeekId = 1,
        Title = "UX and JavaScript",
        WeekNumber = 7,
        Topics = new List<Topic>()
    {
      new Topic
      {
          Title = "UX day 1",
      }
    }

    };
    private static readonly Week MOCK_WEEK_2 = new Week
    {
        WeekId = 2,
        Title = "Career days and Async JavaScript",
        WeekNumber = 8,
        Topics = new List<Topic>()
    {
      new Topic
        {
            Title = "Career Day - 1",
        }
    }
    };

    private static readonly IEnumerable<Week> ALL_WEEKS = new[] { MOCK_WEEK_1, MOCK_WEEK_2 };

    public WeeksControllerTests()
    {
        _repo = new Mock<IRepository>();

        var mappingConfig = new MapperConfiguration(config =>
        {
            config.AddProfile(new Mapper());
        });
        _mapper = mappingConfig.CreateMapper();

        _controller = new WeeksController(_repo.Object, _mapper);
    }

    [Fact]
    public async Task GetWeeks_should_return_OkObjectResult()
    {
        // Arrange
        _repo.Setup(repo => repo.GetWeeks())
            .Returns(Task.FromResult(ALL_WEEKS));

        // Act
        var actionResult = await _controller.GetWeeks();

        // Assert
        Assert.IsType<OkObjectResult>(actionResult.Result);
    }

    [Fact]
    public async Task GetWeeks_should_return_all_weeks()
    {
        // Arrange
        _repo.Setup(repo => repo.GetWeeks())
            .Returns(Task.FromResult(ALL_WEEKS));

        // Act
        var actionResult = await _controller.GetWeeks();
        var result = actionResult.Result as OkObjectResult;
        var weeks = result.Value as IEnumerable<WeekExtResp>;

        // Assert
        Assert.Equal(2, weeks.Count());
        Assert.Equal(MOCK_WEEK_1.Title, weeks.First().Title);
        Assert.Equal(MOCK_WEEK_2.Title, weeks.Last().Title);
    }

    [Fact]
    public async Task GetWeeks_should_return_ProblemDetails()
    {
        // Arrange
        _repo.Setup(repo => repo.GetWeeks())
            .Throws(new Exception());

        // Act
        var actionResult = await _controller.GetWeeks();
        var result = actionResult.Result as ObjectResult;

        // Assert
        Assert.IsType<ProblemDetails>(result.Value);
    }

    [Fact]
    public async Task GetWeeks_should_handle_exception()
    {
        // Arrange
        _repo.Setup(repo => repo.GetWeeks())
            .Throws(new Exception("Mocked error message"));

        // Act
        var actionResult = await _controller.GetWeeks();
        var result = actionResult.Result as ObjectResult;
        var value = result.Value as ProblemDetails;

        // Assert

        Assert.Equal("Mocked error message", value.Detail);
        Assert.Equal(500, value.Status);
    }

    [Fact]
    public async Task GetWeek_should_return_one_week()
    {
        // Arrange
        _repo.Setup(repo => repo.FindWeek(It.IsAny<int>()))
            .Returns(Task.FromResult(MOCK_WEEK_1));

        // Act
        var actionResult = await _controller.GetWeek(1);

        // Assert
        Assert.IsType<OkObjectResult>(actionResult.Result);
        var result = actionResult.Result as OkObjectResult;

        var week = result.Value as WeekExtResp;

        Assert.Equal(MOCK_WEEK_1.Title, week.Title);
        Assert.Equal(MOCK_WEEK_1.WeekId, week.WeekId);
    }
}
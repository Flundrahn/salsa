using ordina.api.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using ordina.api.Models;
using AutoMapper;
using ordina.api.Models.DTOs;

namespace ordina.tests;

public class TopicsControllerTests
{
    private TopicsController _controller;
    private Mock<IRepository> _repo;
    private static IMapper _mapper;

    private static readonly Topic MOCK_TOPIC_1 = new Topic
    {
        TopicId = 1,
        Title = "UX day 1",
        WeekId = 7,
        Day = 36,
        Resources = new List<Resource>()
    {
      new Resource
      {
        ResourceType = ResourceType.LAB,
        Title = "CSS",
        Link = "https://github.com/saltsthlm/dnfs-summer-22-lab-css",
      },
      new Resource
      {
        ResourceType = ResourceType.SLIDES,
        Title = "CSS & HTML",
        Link = "https://salt-sthlm.slack.com/files/U9ZUW8HJ5/F03JQRY4VHR/salt_slides_-_responsive_css_.pdf",
      }
    }
    };
    private static readonly Topic MOCK_TOPIC_2 = new Topic
    {
        TopicId = 2,
        Title = "UX day 2",
        WeekId = 7,
        Day = 37,
        Resources = new List<Resource>()
        {
            new Resource
            {
            ResourceType = ResourceType.LAB,
            Title = "UX",
            Link = "https://github.com/saltsthlm/dnfs-summer-22-lab-css",
            },
            new Resource
            {
            ResourceType = ResourceType.SLIDES,
            Title = "Figma' balls",
            Link = "https://salt-sthlm.slack.com/files/U9ZUW8HJ5/F03JQRY4VHR/salt_slides_-_responsive_css_.pdf",
            }
        }
    };

    private static readonly EditTopic MOCK_EDIT_TOPIC = new EditTopic
    {
        TopicId = 2,
        Title = "React Components",
        WeekId = 7,
        Day = 37,
    };

    private static readonly IEnumerable<Topic> ALL_TOPICS = new[] { MOCK_TOPIC_1, MOCK_TOPIC_2 };

    public TopicsControllerTests()
    {
        _repo = new Mock<IRepository>();

        var mappingConfig = new MapperConfiguration(config =>
        {
            config.AddProfile(new Mapper());
        });
        _mapper = mappingConfig.CreateMapper();

        _controller = new TopicsController(_repo.Object, _mapper);
    }

    [Fact]
    public async Task GetTopics_should_return_OkObjectResult()
    {
        // Arrange
        _repo.Setup(repo => repo.FindTopics())
            .Returns(Task.FromResult(ALL_TOPICS));

        // Act
        var actionResult = await _controller.GetTopics();

        // Assert
        Assert.IsType<OkObjectResult>(actionResult.Result);
    }

    [Fact]
    public async Task GetTopics_should_return_all_topics()
    {
        // Arrange
        _repo.Setup(repo => repo.FindTopics())
            .Returns(Task.FromResult(ALL_TOPICS));

        // Act
        var actionResult = await _controller.GetTopics();
        var result = actionResult.Result as OkObjectResult;
        var topics = result.Value as IEnumerable<Topic>;

        // Assert
        Assert.Equal(2, topics.Count());
        Assert.Equal(MOCK_TOPIC_1.Title, topics.First().Title);
        Assert.Equal(MOCK_TOPIC_2.Title, topics.Last().Title);
    }

    [Fact]
    public async Task GetTopics_should_return_ProblemDetails()
    {
        // Arrange
        _repo.Setup(repo => repo.FindTopics())
            .Throws(new Exception());

        // Act
        var actionResult = await _controller.GetTopics();
        var result = actionResult.Result as ObjectResult;

        // Assert
        Assert.IsType<ProblemDetails>(result.Value);
    }

    [Fact]
    public async Task GetTopics_should_handle_exception()
    {
        // Arrange
        _repo.Setup(repo => repo.FindTopics())
            .Throws(new Exception("Mocked error message"));

        // Act
        var actionResult = await _controller.GetTopics();
        var result = actionResult.Result as ObjectResult;
        var value = result.Value as ProblemDetails;

        // Assert

        Assert.Equal("Mocked error message", value.Detail);
        Assert.Equal(500, value.Status);
    }

    [Fact]
    public async Task GetTopics_should_return_notfound_if_no_topics()
    {
        // Arrange
        _repo.Setup(repo => repo.FindTopics())
            .Returns(Task.FromResult(Enumerable.Empty<Topic>()));

        // Act
        var actionResult = await _controller.GetTopics();
        // var value = result.Value as ProblemDetails;

        // Assert
        Assert.IsType<NotFoundResult>(actionResult.Result);
    }

    [Fact]
    public async Task GetTopic_should_return_one_topic()
    {
        // Arrange
        _repo.Setup(repo => repo.FindTopic(It.IsAny<int>()))
            .Returns(Task.FromResult(MOCK_TOPIC_1));

        // Act
        var actionResult = await _controller.GetTopic(1);

        // Assert
        Assert.IsType<OkObjectResult>(actionResult.Result);
        var result = actionResult.Result as OkObjectResult;

        var topic = result.Value as Topic;

        Assert.Equal(MOCK_TOPIC_1.Title, topic.Title);
        Assert.Equal(MOCK_TOPIC_1.TopicId, topic.TopicId);
    }

    [Fact]
    public async Task PutTopic_should_return_OkObjectResult()
    {
        // Arrange
        _repo.Setup(repo => repo.ReplaceTopic(It.IsAny<Topic>()))
            .Returns(Task.FromResult(MOCK_TOPIC_1));

        // Act
        var actionResult = await _controller.PutTopic(MOCK_EDIT_TOPIC.TopicId, MOCK_EDIT_TOPIC);

        // Assert
        Assert.IsType<OkObjectResult>(actionResult.Result);
    }

    [Fact]
    public async Task PutTopic_should_return_the_replacing_topic()
    {
        // Arrange
        _repo.Setup(repo => repo.ReplaceTopic(It.IsAny<Topic>()))
            .Returns(Task.FromResult(MOCK_TOPIC_2));

        // Act
        var actionResult = await _controller.PutTopic(MOCK_EDIT_TOPIC.TopicId, MOCK_EDIT_TOPIC);

        var result = actionResult.Result as OkObjectResult;
        var topic = result.Value as Topic;

        // Assert
        Assert.Equal(MOCK_TOPIC_2.Title, topic.Title);
        Assert.Equal(MOCK_TOPIC_2.TopicId, topic.TopicId);
    }

    [Fact]
    public async Task PutTopic_should_return_NotFound_if_key_not_found()
    {
        // Arrange
        _repo.Setup(repo => repo.ReplaceTopic(It.IsAny<Topic>()))
            .Throws(new KeyNotFoundException("Mocked error message"));

        // Act
        var actionResult = await _controller.PutTopic(MOCK_EDIT_TOPIC.TopicId, MOCK_EDIT_TOPIC);

        // Assert
        Assert.IsType<NotFoundObjectResult>(actionResult.Result);
        var result = actionResult.Result as NotFoundObjectResult;
        Assert.Equal("Mocked error message", result.Value);
    }

    [Fact]
    public async Task PutTopic_should_handle_exception()
    {
        // Arrange
        _repo.Setup(repo => repo.ReplaceTopic(It.IsAny<Topic>()))
            .Throws(new Exception("Mocked error message"));

        // Act
        var actionResult = await _controller.PutTopic(MOCK_EDIT_TOPIC.TopicId, MOCK_EDIT_TOPIC);
        var result = actionResult.Result as ObjectResult;
        var value = result.Value as ProblemDetails;

        // Assert
        Assert.Equal("Mocked error message", value.Detail);
        Assert.Equal(500, value.Status);
    }
}
using Microsoft.AspNetCore.Mvc;

namespace salsa.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestResponseController : ControllerBase
{
    private readonly ILogger<TestResponseController> _logger;

    public TestResponseController(ILogger<TestResponseController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetTestResponse")]
    public string Get() => "Salsa API is up and running!";
}

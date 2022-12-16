using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using salsa.api.Models;
using salsa.api.Models.DTOs;

namespace salsa.api.Controllers;
[Route("api/[controller]")]
[ApiController]
public class CoursesController : ControllerBase
{
    private readonly IRepository _repo;
    private readonly IMapper _mapper;

    public CoursesController(IRepository repository, IMapper mapper)
    {
        _mapper = mapper;
        _repo = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
    {
        try
        {
            var courses = await _repo.GetAllCourses();
            if (courses == null) return NotFound();
            return Ok(courses);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return Problem(e.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Course>> GetCourse(int id)
    {
        try
        {
            var course = await _repo.FindCourse(id);
            if (course == null) return NotFound();
            return Ok(course);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return Problem(e.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> PostCourse(CreateCourse dto)
    {

        try
        {
            var persistedEntity = await _repo.CreateCourse(_mapper.Map<Course>(dto));
            return CreatedAtAction("GetCourse",
            new { id = persistedEntity.CourseId },
            persistedEntity);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Oops.");
        }
    }

    [HttpPut]
    public async Task<IActionResult> PutCourse(UpdateCourse dto)
    {
        try
        {
            var course = await _repo.FindCourse(dto.CourseId);
            if (course == null) return NotFound();

            var updatedCourse = _mapper.Map(dto, course);

            var id = await _repo.UpdateCourse(updatedCourse);

            return NoContent();
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Oops.");
        }
    }

}

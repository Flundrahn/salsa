using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ordina.api.Models;
using ordina.api.Models.DTOs;

namespace ordina.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeeksController : ControllerBase
    {
        private readonly IRepository _repo;
        private readonly IMapper _mapper;

        public WeeksController(IRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WeekExtResp>> GetWeek(int id)
        {
            try
            {
                var week = _mapper.Map<WeekExtResp>(await _repo.FindWeek(id));
                if (week == null) return NotFound();
                return Ok(week);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return Problem(e.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WeekExtResp>>> GetWeeks()
        {
            try
            {
                return Ok(_mapper.Map<IEnumerable<WeekExtResp>>(await _repo.GetWeeks()));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Problem(e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<WeekExtResp>> PostWeek(CreateWeek dto)
        {
            var week = _mapper.Map<Week>(dto);
            if (_repo.WeekExists(week))
                return BadRequest("There is already a week with this week number");

            try
            {
                var persistedEntity = await _repo.CreateWeek(week);
                return CreatedAtAction("GetWeek",
                new { id = persistedEntity.WeekId },
                persistedEntity);
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }
        }
    }
}
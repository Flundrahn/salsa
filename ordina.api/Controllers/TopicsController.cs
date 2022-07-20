using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ordina.api.Models;
using ordina.api.Models.DTOs;

namespace ordina.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicsController : ControllerBase
    {
        private readonly IRepository _repo;
        private readonly IMapper _mapper;

        public TopicsController(IRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Topic>>> GetTopics()
        {
            IEnumerable<Topic> topics;
            try
            {
                topics = await _repo.FindTopics();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Problem(e.Message);
            }
            if (topics.Count() == 0)
            {
                return NotFound();
            }
            return Ok(topics);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Topic>> GetTopic(int id)
        {

            try
            {
                var topic = await _repo.FindTopic(id);
                if (topic == null) return NotFound();
                return Ok(topic);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return Problem(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Topic>> PutTopic(int id, EditTopic dto)
        {
            if (id != dto.TopicId) return BadRequest(); // TODO I know I have seen this pattern to have id in two places for PUT-request, but suggest to simplify this by having id inside EditTopic only.
            try
            {
                return Ok(await _repo.ReplaceTopic(_mapper.Map<Topic>(dto)));
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Topic>> PostTopic(CreateTopic dto)
        {
            try
            {
                var persistedEntity = await _repo.CreateTopic(_mapper.Map<Topic>(dto));
                return CreatedAtAction("GetTopic",
                new { id = persistedEntity.TopicId },
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

        // // DELETE: api/Topics/5                                      TODO later
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteTopic(int id)
        // {
        //     if (_context.Topics == null) return NotFound();

        //     var topic = await _context.Topics.FindAsync(id);
        //     if (topic == null) return NotFound();


        //     _context.Topics.Remove(topic);
        //     await _context.SaveChangesAsync();

        //     return NoContent();
        // }

    }
}

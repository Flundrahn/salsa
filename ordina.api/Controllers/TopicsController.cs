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
            try
            {
                return Ok(await _repo.FindTopics());
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return NotFound();
            }
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
            if (id != dto.TopicId) return BadRequest();
            try
            {
<<<<<<< Updated upstream
                var replacedEntity = await _repo.ReplaceEntity(_mapper.Map<Topic>(dto));
                return Ok(replacedEntity);
=======
                return Ok(await _repo.ReplaceTopic(_mapper.Map<Topic>(dto)));
>>>>>>> Stashed changes
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return NoContent();
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

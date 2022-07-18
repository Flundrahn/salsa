using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ordina.api.Models;

namespace ordina.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicsController : ControllerBase
    {
        private readonly IRepository _repo;

        public TopicsController(IRepository repository)
        {
            _repo = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Topic>>> GetTopic()
        {
            try
            {
                return Ok(await _repo.GetTopics());
            }
            catch (Exception e)
            {
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
        public async Task<IActionResult> PutTopic(int id, Topic topic)
        {
            if (id != topic.TopicId) return BadRequest();
            try
            {
                _repo.ReplaceEntity(topic);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Topic>> PostTopic(Topic topic)
        {
            try
            {
                Topic persistedTopic = await _repo.CreateTopic(topic);
                return CreatedAtAction("GetTopic",
                new { id = persistedTopic.TopicId },
                persistedTopic);
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

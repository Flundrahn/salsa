using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ordina.api.Models;
using ordina.api.Models.DTOs;

namespace ordina.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourcesController : ControllerBase
    {
        private readonly IRepository _repo;
        private readonly IMapper _mapper;
        public readonly DataContext _context;

        public ResourcesController(IRepository repository, IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _repo = repository;
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Resource>> GetResource(int id)
        {

            try
            {
                var resource = await _repo.FindResource(id);
                if (resource == null) return NotFound();
                return Ok(resource);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return Problem(e.Message);
            }
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Resource>>> FilterResources(ResourceType resourceType)
        {
            try
            {
                return Ok(await _repo.FindResources(resourceType));
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Resource>> PutResource(int id, EditResource dto)
        {
            if (id != dto.ResourceId) return BadRequest();
            try
            {
                var replacedResource = await _repo.ReplaceResource(_mapper.Map<Resource>(dto));
                return Ok(replacedResource);
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
        public async Task<ActionResult<Resource>> PostResource(CreateResource dto)
        {
            try
            {
                var persistedEntity = await _repo.CreateResource(_mapper.Map<Resource>(dto));
                return CreatedAtAction("GetResource",
                new { id = persistedEntity.ResourceId },
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

        // [HttpPost]
        // public async Task<ActionResult<IEnumerable<Resource>>> PostResources(IEnumerable<CreateResource> dto)
        // {
        //     try
        //     {
        //         var persistedEntity = await _repo.CreateResources(_mapper.Map<IEnumerable<Resource>>(dto));
        //         return CreatedAtAction("GetResource",
        //         new { id = persistedEntity.ResourceId },
        //         persistedEntity);
        //     }
        //     catch (KeyNotFoundException e)
        //     {
        //         return NotFound(e.Message);
        //     }
        //     catch (Exception e)
        //     {
        //         Console.WriteLine(e);
        //         return Problem("Oops.");
        //     }
        // }
		

        [HttpDelete("{id}")]
        public async Task<ActionResult<Resource>> DeleteResource(int id)
        {
            if (_context.Resources == null) return NotFound();

            var resource = await _context.Resources.FindAsync(id);
            if (resource == null) return NotFound();


            _context.Resources.Remove(resource);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}

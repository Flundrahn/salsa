using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using salsa.api.Models;
using salsa.api.Models.DTOs;

namespace salsa.api.Controllers
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
        public async Task<ActionResult<ResourceResponse>> GetResource(int id)
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
        public async Task<ActionResult<IEnumerable<ResourceResponse>>> FilterResources(ResourceType resourceType)
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

        [HttpPut]
        public async Task<ActionResult<ResourceResponse>> PutResource(EditResource dto)
        {
            try
            {
                var replacedResource = await _repo.ReplaceResource(dto);
                return Ok(_mapper.Map<ResourceResponse>(replacedResource));
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
                var persistedEntity = await _repo.CreateResource(dto);
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

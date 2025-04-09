using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using INTEX.API.Data;
using INTEX.API.Models;

namespace INTEX.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRecommendationController : ControllerBase
    {
        private readonly UserRecommendationDbContext _context;

        public UserRecommendationController(UserRecommendationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<UserRecommendations>> GetRecommendations(long userId)
        {
            var recs = await _context.UserRecommendations.FindAsync(userId);

            if (recs == null)
            {
                return NotFound();
            }

            return recs;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserRecommendations>>> GetAllRecommendations()
        {
            return await _context.UserRecommendations.ToListAsync();
        }
    }
}
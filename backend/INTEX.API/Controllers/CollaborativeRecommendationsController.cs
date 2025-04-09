using Microsoft.AspNetCore.Mvc;
using INTEX.API.Data;
using INTEX.API.Models;

namespace INTEX.API.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class CollaborativeRecommendationsController : ControllerBase
    {
        private readonly CollaborativeRecommendationContext _context;

        public CollaborativeRecommendationsController(CollaborativeRecommendationContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public ActionResult<CollaborativeRecommendation> GetById(string id)
        {
            var rec = _context.MovieRecommendations
                .FirstOrDefault(r => r.IfYouLiked.ToLower() == id.ToLower());

            if (rec == null) return NotFound();
            return rec;
        }
    }
}
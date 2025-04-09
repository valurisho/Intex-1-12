using INTEX.API.Data;
using INTEX.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace INTEX.API.Controllers
{
    [Route("api/genrerecommendation")]
    [ApiController]
    public class GenreRecommendationController : ControllerBase
    {
        private readonly GenreRecommendationsContext _context;

        public GenreRecommendationController(GenreRecommendationsContext context)
        {
            _context = context;
        }

        [HttpGet("{genre}/{userId}")]
        public async Task<ActionResult<IEnumerable<string>>> GetRecommendations(string genre, string userId)
        {
            genre = genre.ToLower();

            switch (genre)
            {
                case "comedy":
                    var comedy = await _context.Comedy.FindAsync(userId);
                    if (comedy == null) return NotFound();
                    return Ok(ExtractRecommendations(comedy));

                case "adventure":
                    var adventure = await _context.Adventure.FindAsync(userId);
                    if (adventure == null) return NotFound();
                    return Ok(ExtractRecommendations(adventure));

                case "dramas":
                    var dramas = await _context.Dramas.FindAsync(userId);
                    if (dramas == null) return NotFound();
                    return Ok(ExtractRecommendations(dramas));

                case "family":
                    var family = await _context.Family.FindAsync(userId);
                    if (family == null) return NotFound();
                    return Ok(ExtractRecommendations(family));

                case "horrorthrillers":
                    var horror = await _context.Horror_Thrillers.FindAsync(userId); // <-- this is the fix
                    if (horror == null) return NotFound();
                    return Ok(ExtractRecommendations(horror));

                default:
                    return BadRequest("Invalid genre. Try comedy, adventure, dramas, family, or horrorthrillers.");
            }
        }

        private List<string> ExtractRecommendations(GenreRecommendation rec)
        {
            return new List<string>
            {
                rec.recommendation1,
                rec.recommendation2,
                rec.recommendation3,
                rec.recommendation4,
                rec.recommendation5,
                rec.recommendation6,
                rec.recommendation7,
                rec.recommendation8,
                rec.recommendation9,
                rec.recommendation10
            };
        }
    }
}
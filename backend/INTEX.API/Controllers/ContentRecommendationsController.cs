using Microsoft.AspNetCore.Mvc;
using INTEX.API.Data;
using INTEX.API.Models;
using System.Linq;

namespace INTEX.API.Controllers;

    [Route("/[controller]")]
    [ApiController]
    public class ContentRecommendationsController : ControllerBase
    {
        private readonly RecommendationContext _context;

        public ContentRecommendationsController(RecommendationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ContentRecommendation>> GetAll()
        {
            return _context.ContentRecommendations.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<ContentRecommendation> GetById(string id)
        {
            var item = _context.ContentRecommendations.FirstOrDefault(c => c.show_id == id);
            if (item == null) return NotFound();
            return item;
        }
    }

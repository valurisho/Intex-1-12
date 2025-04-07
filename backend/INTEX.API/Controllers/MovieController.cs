using INTEX.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace INTEX.API.Controllers
{
    
    [ApiController]
    [Route("/[controller]")]

    public class MovieController : ControllerBase
    {
        private MovieDbContext _movieContext;

        public MovieController(MovieDbContext temp)
        {
            _movieContext = temp;
        }

        [HttpGet("GetAllMovies")]
        public IActionResult GetAllMovies()
        {
            var movies = _movieContext.Movies.ToList();
            return Ok(movies);
        }

        //MOVIE TYPES
        [HttpGet("GetMovieTypes")]
        public IActionResult GetMovieTypes()
        {
            var genres = new List<string>
            {
                "Action",
                "Adventure",
                "AnimeSeriesInternationalTVShows",
                "BritishTVShowsDocuseriesInternationalTVShows",
                "Children",
                "Comedies",
                "ComediesDramasInternationalMovies",
                "ComediesInternationalMovies",
                "ComediesRomanticMovies",
                "CrimeTVShowsDocuseries",
                "Documentaries",
                "DocumentariesInternationalMovies",
                "Docuseries",
                "Dramas",
                "DramasInternationalMovies",
                "DramasRomanticMovies",
                "FamilyMovies",
                "Fantasy",
                "HorrorMovies",
                "InternationalMoviesThrillers",
                "InternationalTVShowsRomanticTVShowsTVDramas",
                "KidsTV",
                "LanguageTVShows",
                "Musicals",
                "NatureTV",
                "RealityTV",
                "Spirituality",
                "TVAction",
                "TVComedies",
                "TVDramas",
                "TalkShowsTVComedies",
                "Thrillers"
            };

            return Ok(genres);
        }

        //ADD MOVIE
        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] Movie newMovie)
        {
            _movieContext.Movies.Add(newMovie);
            _movieContext.SaveChanges();
            
            return Ok(newMovie);
        }
        
        // //UPDATE MOVIE 
        // [HttpPut("updateMovie/{show_id}")]
        // public IActionResult UpdateMovie(int show_id, [FromBody] Movie updatedMovie)
        // {
        //     var movie = _movieContext.Movies.Find(show_id);
        //     
        // }
        
        // DELETE
        [HttpDelete("deleteMovie/{show_id}")]
        public IActionResult DeleteMovie(int show_id)
        {
            var movie = _movieContext.Movies.Find(show_id);

            if (movie != null)
            {
                return NotFound(new {message = "Movie not found"});
            }
            
            _movieContext.Movies.Remove(movie);
            _movieContext.SaveChanges();
            
            return Ok(new {message = "Movie deleted"});
        }
        
    }
}




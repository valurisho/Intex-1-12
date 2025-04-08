using INTEX.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public IActionResult GetAllMovies([FromQuery] string categories = "")
        {
            var categoryList = categories.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList();

            var query = _movieContext.Movies
                .Include(m => m.movieCategories)
                .ThenInclude(mc => mc.Category)
                .AsQueryable();

            if (categoryList.Any())
            {
                query = query.Where(m =>
                    m.movieCategories.Any(mc => categoryList.Contains(mc.Category.Name)));
            }

            var movies = query
                .Select(m => new
                {
                    show_id = m.show_id,
                    title = m.title,
                    type = m.type,
                    director = m.director,
                    cast = m.cast,
                    country = m.country,
                    release_year = m.release_year,
                    rating = m.rating,
                    duration = m.duration,
                    description = m.description,
                    categories = m.movieCategories.Select(mc => mc.Category.Name).ToList()
                })
                .ToList();

            return Ok(movies);
        }


        /*[HttpGet("GetAllMovies")]
        public IActionResult GetAllMovies()
        {
            var movies = _movieContext.Movies.ToList();
            return Ok(movies);
        }*/
        /*[HttpGet("AllMovies")]
        public IActionResult GetMovies(
            [FromQuery] int pageHowMany = 5,
            [FromQuery] int pageNum = 1,
            [FromQuery] string categories = ""
        )
        {
            var categoryList = categories.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList();

            var query = _movieContext.Movies
                .Include(m => m.movieCategories)
                .ThenInclude(mc => mc.Category)
                .AsQueryable();

            if (categoryList.Any())
            {
                query = query.Where(m =>
                    m.movieCategories.Any(mc => categoryList.Contains(mc.Category.Name)));
            }

            // Pagination
            var movies = query
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .Select(m => new
                {
                    id = m.show_id,
                    title = m.title,
                    description = m.description,
                    categories = m.movieCategories.Select(mc => mc.Category.Name)
                })
                .ToList();

            return Ok(movies);
        }*/
        
        //Get Categories
        [HttpGet("GetCategories")]
        public IActionResult GetCategories()
        {
            var categories = _movieContext.Categories
                .Select(c => c.Name)
                .ToList();

            return Ok(categories);
        }
        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] MovieDto newMovieDto)
        {
            if (newMovieDto.release_year < 1700)
            {
                return BadRequest("Release year must be 1700 or later.");
            }

            var newMovie = new Movie
            {
                show_id = Guid.NewGuid().ToString(),
                title = newMovieDto.title,
                type = newMovieDto.type,
                director = newMovieDto.director,
                cast = newMovieDto.cast,
                country = newMovieDto.country,
                release_year = newMovieDto.release_year,
                rating = newMovieDto.rating,
                duration = newMovieDto.duration,
                description = newMovieDto.description,
                movieCategories = new List<MovieCategories>()
            };

            // Fetch matching category entities from the DB
            var matchingCategories = _movieContext.Categories
                .Where(c => newMovieDto.categories.Contains(c.Name))
                .ToList();

            foreach (var category in matchingCategories)
            {
                newMovie.movieCategories.Add(new MovieCategories
                {
                    Movie = newMovie,
                    Category = category
                });
            }

            _movieContext.Movies.Add(newMovie);
            _movieContext.SaveChanges();

            return Ok(newMovie);
        }

        
        //// DELETE
        [HttpDelete("deleteMovie/{show_id}")]
        public IActionResult DeleteMovie(int show_id)
        {
            var movie = _movieContext.Movies.Find(show_id);
          
            if (movie == null)
            {
                return NotFound(new {message = "Movie not found"});
            }
                      
            _movieContext.Movies.Remove(movie);
            _movieContext.SaveChanges();
                      
            return Ok(new {message = "Movie deleted"});
        }
        
        [HttpGet("GetMovieById/{id}")]
        public async Task<IActionResult> GetMovieById(string id)
        {
            var movie = await _movieContext.Movies.FindAsync(id);
            if (movie == null) return NotFound(new {message = "Movie not found"});
            return Ok(movie);
        }
                  
    } 
    
    /// //UPDATE MOVIE 
    // [HttpPut("updateMovie/{show_id}")]
    // public IActionResult UpdateMovie(int show_id, [FromBody] Movie updatedMovie)
    // {
    //     var movie = _movieContext.Movies.Find(show_id);
    //     
    // }
    
    }
      
        

        /*//MOVIE TYPES
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
        }*/
        
       
        /// //UPDATE MOVIE 
        // [HttpPut("updateMovie/{show_id}")]
        // public IActionResult UpdateMovie(int show_id, [FromBody] Movie updatedMovie)
        // {
        //     var movie = _movieContext.Movies.Find(show_id);
        //     
        // }
        //
        //
        //
        // PULL MOVIE DATA WHEN SOMEONE CLICKS ON A MOVIE
    
        //



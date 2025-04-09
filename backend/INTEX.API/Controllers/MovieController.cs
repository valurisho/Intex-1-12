using INTEX.API.Data;
using INTEX.API.DTOs;
using INTEX.API.Models;
using Microsoft.AspNetCore.Authorization;
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
        
        // GetAllMoviesAPI
        [HttpGet("GetAllMovies")]
        [Authorize]
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

        
        //Get Categories
        [HttpGet("GetCategories")]
        [Authorize]
        public IActionResult GetCategories()
        {
            var categories = _movieContext.Categories
                .Select(c => c.Name)
                .ToList();

            return Ok(categories);
        }
        
        // ADD A MOVIE
        [HttpPost("AddMovie")]
        [Authorize(Roles = "Adminstrator")]
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

            // Normalize category names (trim + lowercase)
            var normalizedCategoryNames = newMovieDto.categories
                .Select(c => c.Trim().ToLower())
                .ToList();

            // Match from DB (case-insensitive)
            var matchingCategories = _movieContext.Categories
                .Where(c => normalizedCategoryNames.Contains(c.Name.ToLower()))
                .ToList();

            // Optional: Warn if any category was not found
            if (matchingCategories.Count != normalizedCategoryNames.Count)
            {
                return BadRequest("One or more selected categories do not exist.");
            }

            // Link movie to categories
            foreach (var category in matchingCategories)
            {
                newMovie.movieCategories.Add(new MovieCategories
                {
                    MovieId = newMovie.show_id,
                    CategoryId = category.CategoryId
                });
            }

            _movieContext.Movies.Add(newMovie);
            _movieContext.SaveChanges();

            return Ok(new { message = "Movie added successfully." });
        }

        
        // DELETE
        [HttpDelete("deleteMovie/{show_id}")]
        [Authorize(Roles = "Adminstrator")]
        public IActionResult DeleteMovie(string show_id)
        {
            var movie = _movieContext.Movies
                .Include(m => m.movieCategories)
                .FirstOrDefault(m => m.show_id == show_id);

            if (movie == null)
            {
                return NotFound(new { message = "Movie not found" });
            }
            _movieContext.MovieCategories.RemoveRange(movie.movieCategories);



            _movieContext.Movies.Remove(movie);
            _movieContext.SaveChanges();

            return Ok(new { message = "Movie deleted" });
        }
        
        
        //GET MOVIE BY ID FOR THE MOVIEDETAILSPAGE
        [HttpGet("GetMovieById/{show_id}")]
        [Authorize]
        public IActionResult GetMovieById(string show_id)
        {
            var movie = _movieContext.Movies
                .Include(m => m.movieCategories)
                .ThenInclude(mc => mc.Category)
                .FirstOrDefault(m => m.show_id == show_id);

            if (movie == null) return NotFound();

            var result = new
            {
                movie.show_id,
                movie.title,
                movie.type,
                movie.director,
                movie.cast,
                movie.country,
                movie.release_year,
                movie.rating,
                movie.duration,
                movie.description,
                categories = movie.movieCategories.Select(mc => mc.Category.Name).ToList() // ✅ categories assigned to this movie
            };

            return Ok(result);
        }

        // EDIT MOVIE
        [HttpPut("updateMovie/{show_id}")]
        [Authorize(Roles = "Adminstrator")]
        public IActionResult UpdateMovie(string show_id, [FromBody] MovieDto updatedMovieDto)
        {
            var movie = _movieContext.Movies
                .Include(m => m.movieCategories)
                .FirstOrDefault(m => m.show_id == show_id);

            if (movie == null)
            {
                return NotFound("Movie not found.");
            }

            if (updatedMovieDto.release_year < 1700)
            {
                return BadRequest("Release year must be 1700 or later.");
            }

            // Update basic movie info
            movie.title = updatedMovieDto.title;
            movie.type = updatedMovieDto.type;
            movie.director = updatedMovieDto.director;
            movie.cast = updatedMovieDto.cast;
            movie.country = updatedMovieDto.country;
            movie.release_year = updatedMovieDto.release_year;
            movie.rating = updatedMovieDto.rating;
            movie.duration = updatedMovieDto.duration;
            movie.description = updatedMovieDto.description;

            // Normalize category names
            var normalizedCategoryNames = updatedMovieDto.categories
                .Select(c => c.Trim().ToLower())
                .ToList();

            var matchingCategories = _movieContext.Categories
                .Where(c => normalizedCategoryNames.Contains(c.Name.ToLower()))
                .ToList();

            if (matchingCategories.Count != normalizedCategoryNames.Count)
            {
                return BadRequest("One or more selected categories do not exist.");
            }

            // Remove old category links
            _movieContext.MovieCategories.RemoveRange(movie.movieCategories);

            // Add new category links
            foreach (var category in matchingCategories)
            {
                _movieContext.MovieCategories.Add(new MovieCategories
                {
                    MovieId = movie.show_id,
                    CategoryId = category.CategoryId
                });
            }

            _movieContext.SaveChanges();
            return Ok(new { message = "Movie updated successfully." });
        }
        
        //ROUTE TO SAVE MOVIE/USER RATINGS TO THE DATABASE
        [HttpPost("AddRating")]
        [Authorize]
        public async Task<IActionResult> AddRating([FromBody] MovieRatingDto movieRatingDto)
        {
            if (movieRatingDto.Rating < 1 || movieRatingDto.Rating > 5)
            {
                return BadRequest("Rating must be between 1 and 5.");
            }
            // Check if the user already rated this movie
            var existingRating = await _movieContext.MovieRatings.FindAsync(movieRatingDto.UserId, movieRatingDto.ShowId);

            if (existingRating != null)
            {
                existingRating.Rating = movieRatingDto.Rating;
            }
            else
            {
                var movieRating = new MovieRating
                {
                    UserId = movieRatingDto.UserId,
                    ShowId = movieRatingDto.ShowId,
                    Rating = movieRatingDto.Rating
                };

                await _movieContext.MovieRatings.AddAsync(movieRating);
            }

            await _movieContext.SaveChangesAsync();

            return Ok(new { message = "Rating saved successfully!" });
        }
            
            
        }
        
        
        
        
                  
    }
    


/*[HttpGet("GetMovieById/{id}")]
     public async Task<IActionResult> GetMovieById(string id)
     {
         var movie = await _movieContext.Movies.FindAsync(id);
         if (movie == null) return NotFound(new {message = "Movie not found"});
         return Ok(movie);
     }*/




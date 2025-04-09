// DTOs/MovieRatingDto.cs
namespace INTEX.API.DTOs
{
    public class MovieRatingDto
    {
        public int UserId { get; set; }
        public string ShowId { get; set; }
        public int Rating { get; set; }
    }
}
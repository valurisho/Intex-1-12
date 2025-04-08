// DTOs/MovieRatingDto.cs
namespace INTEX.API.DTOs
{
    public class MovieRatingDto
    {
        public int UserId { get; set; }
        public int ShowId { get; set; }
        public int Rating { get; set; }
    }
}
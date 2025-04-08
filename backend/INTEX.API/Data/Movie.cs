using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace INTEX.API.Data
{
    public class Movie
    {
        [Key]
        public string show_id { get; set; }
        public string type { get; set; }
        public string title { get; set; }
        public string? director { get; set; }
        public string? cast { get; set; }
        public string? country { get; set; }
        
        [Range(1700, 2100, ErrorMessage = "Release year must be between 1700 and 2100.")]
        public int? release_year { get; set; }
        public string? rating { get; set; }
        public string? duration { get; set; }
        public string? description { get; set; }

        public ICollection<MovieCategories> movieCategories { get; set; }
    }


}
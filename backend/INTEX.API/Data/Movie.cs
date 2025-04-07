using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace INTEX.API.Data
{
    [Table("movies_titles")]
    public class Movie
    {

    [Required]
    [Key]
    public string show_id { get; set; }
    public string type { get; set; }
    public string title { get; set; }
    public string? director { get; set; }
    public string? cast { get; set; }
    public string? country { get; set; }
    public  int? release_year { get; set; }
    public string? rating { get; set; }
    public string? duration { get; set; }
    public string? description { get; set; }
    
    public bool Action { get; set; }
    public bool Adventure { get; set; }
    public bool AnimeSeriesInternationalTVShows { get; set; }
    public bool BritishTVShowsDocuseriesInternationalTVShows { get; set; }
    public bool Children { get; set; }
    public bool Comedies { get; set; }
    public bool ComediesDramasInternationalMovies { get; set; }
    public bool ComediesInternationalMovies { get; set; }
    public bool ComediesRomanticMovies { get; set; }
    public bool CrimeTVShowsDocuseries { get; set; }
    public bool Documentaries { get; set; }
    public bool DocumentariesInternationalMovies { get; set; }
    public bool Docuseries { get; set; }
    public bool Dramas { get; set; }
    public bool DramasInternationalMovies { get; set; }
    public bool DramasRomanticMovies { get; set; }
    public bool FamilyMovies { get; set; }
    public bool Fantasy { get; set; }
    public bool HorrorMovies { get; set; }
    public bool InternationalMoviesThrillers { get; set; }
    public bool InternationalTVShowsRomanticTVShowsTVDramas { get; set; }
    public bool KidsTV { get; set; }
    public bool LanguageTVShows { get; set; }
    public bool Musicals { get; set; }
    public bool NatureTV { get; set; }
    public bool RealityTV { get; set; }
    public bool Spirituality { get; set; }
    public bool TVAction { get; set; }
    public bool TVComedies { get; set; }
    public bool TVDramas { get; set; }
    public bool TalkShowsTVComedies { get; set; }
    public bool Thrillers { get; set; }
}
}
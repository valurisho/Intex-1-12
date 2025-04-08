namespace INTEX.API.Data;

public class MovieCategories
{
    public string MovieId { get; set; }
    public Movie Movie { get; set; }

    public int CategoryId { get; set; }
    public Categories Category { get; set; }

}
namespace INTEX.API.Data;

public class MovieDto
{
    public string title { get; set; }
    public string type { get; set; }
    public string? director { get; set; }
    public string? cast { get; set; }
    public string? country { get; set; }
    public int release_year { get; set; }
    public string? rating { get; set; }
    public string? duration { get; set; }
    public string? description { get; set; }
    public List<string> categories { get; set; } // category names
    
}
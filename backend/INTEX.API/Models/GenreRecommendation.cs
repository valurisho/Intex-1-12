namespace INTEX.API.Models;

public class GenreRecommendation
{
    public string user_id { get; set; }
    public string recommendation1 { get; set; }
    public string recommendation2 { get; set; }
    public string recommendation3 { get; set; }
    public string recommendation4 { get; set; }
    public string recommendation5 { get; set; }
    public string recommendation6 { get; set; }
    public string recommendation7 { get; set; }
    public string recommendation8 { get; set; }
    public string recommendation9 { get; set; }
    public string recommendation10 { get; set; }
}

public class Comedy : GenreRecommendation { }
public class Adventure : GenreRecommendation { }
public class Dramas : GenreRecommendation { }
public class Family : GenreRecommendation { }
public class HorrorThrillers : GenreRecommendation { }
using INTEX.API.Data;
using Microsoft.AspNetCore.Mvc;
namespace INTEX.API.Controllers;
public class MovieController: ControllerBase
{
    private MovieDbContext _movieContext;
    public MovieController(MovieDbContext temp)
    {
        _movieContext = temp;
    }
}
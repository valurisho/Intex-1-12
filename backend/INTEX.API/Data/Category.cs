using System.ComponentModel.DataAnnotations;

namespace INTEX.API.Data;

public class Categories
{
    [Key]
    public int CategoryId { get; set; }
    public string Name { get; set; }

    public ICollection<MovieCategories> movieCategories { get; set; }
}

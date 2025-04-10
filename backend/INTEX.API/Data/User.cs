using System.ComponentModel.DataAnnotations;
namespace INTEX.API.Data;
public class User
{
    [Key]
    public int UserId { get; set; }
    public string Name { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public int? Age { get; set; }
    public string? Gender { get; set; }


}
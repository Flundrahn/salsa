using System.ComponentModel.DataAnnotations;

namespace salsa.api.Models.DTOs;
public class CreateWeek
{
    [Required, MaxLength(50), MinLength(2)]
    public string Title { get; set; }
    [Required, Range(1, 199, ErrorMessage = "Please enter a value larger than zero")]
    public int WeekNumber { get; set; }
}
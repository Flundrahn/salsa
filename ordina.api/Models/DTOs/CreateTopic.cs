using System.ComponentModel.DataAnnotations;

namespace ordina.api.Models.DTOs;
public class CreateTopic
{
    [Required, MaxLength(50), MinLength(2)]
    public string Title { get; set; }
    [Required]
    public int WeekId { get; set; }
    [Required]
    public int Day { get; set; }

}
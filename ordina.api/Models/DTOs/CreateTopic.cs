using System.ComponentModel.DataAnnotations;

namespace ordina.api.Models.DTOs;
public class CreateTopic
{
    [Required, MaxLength(50), MinLength(2)]
    public string Title { get; set; }
    [Required, Range(1, 199, ErrorMessage = "Please enter a value larger than zero")]
    public int Day { get; set; }
}
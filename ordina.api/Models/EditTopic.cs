using System.ComponentModel.DataAnnotations;

namespace ordina.api.Models;
public class EditTopic
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public int WeekId { get; set; }
    [Required]
    public int Day { get; set; }

}
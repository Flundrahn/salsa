using System.ComponentModel.DataAnnotations;

namespace salsa.api.Models.DTOs;
public class EditTopic
{
    [Required]
    public int TopicId { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public int WeekId { get; set; }
    [Required]
    public int Day { get; set; }

}
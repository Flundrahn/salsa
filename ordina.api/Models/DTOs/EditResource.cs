using System.ComponentModel.DataAnnotations;

namespace ordina.api.Models.DTOs;
public class EditResource
{
    [Required]
    public int ResourceId { get; set; }
    [Required]
    public Type Type { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public string Link { get; set; }
    [Required]
    public int TopicId { get; set; }

}
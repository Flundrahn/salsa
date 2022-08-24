using System.ComponentModel.DataAnnotations;

namespace salsa.api.Models.DTOs;
public class EditResource
{
    [Required]
    public int ResourceId { get; set; }
    [Required]
    public ResourceType ResourceType { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public string Link { get; set; }
    [Required]
    public int TopicDay { get; set; }
    // public int? TopicId { get; set; }

}
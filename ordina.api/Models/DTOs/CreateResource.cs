using System.ComponentModel.DataAnnotations;

namespace ordina.api.Models.DTOs;
public class CreateResource
{
    [Required]
    public ResourceType ResourceType { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public string Link { get; set; } // TODO Add validation of correct url
    [Required]
    public int TopicId { get; set; }

}
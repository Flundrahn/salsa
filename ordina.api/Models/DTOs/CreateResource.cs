using System.ComponentModel.DataAnnotations;

namespace ordina.api.Models.DTOs;
public class CreateResource
{
    [Required(ErrorMessage = "Resource type is a required field")]
    public ResourceType ResourceType { get; set; }
    [Required(ErrorMessage = "Title is a required field.")]
    public string Title { get; set; }
    [Required(ErrorMessage = "Link is a required field.")]
    public string Link { get; set; } // TODO Add validation of correct url
    [Required(ErrorMessage = "Day of topic is a required field.")]
    public int TopicDay { get; set; }

}
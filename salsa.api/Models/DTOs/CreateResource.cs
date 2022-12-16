using System.ComponentModel.DataAnnotations;

namespace salsa.api.Models.DTOs;
public class CreateResource
{
    [Required(ErrorMessage = "Resource type is a required field")]
    public ResourceType ResourceType { get; set; }
    [Required(ErrorMessage = "Title is a required field.")]
    public string Title { get; set; }
    [Required(ErrorMessage = "Link is a required field.")]
    public string Link { get; set; } // TODO Add validation of correct url
    [
        Required(ErrorMessage = "Day of topic is a required field."),
        Range(0, 365, ErrorMessage = "Please enter valid number")
    ]
    public int TopicDay { get; set; }

}
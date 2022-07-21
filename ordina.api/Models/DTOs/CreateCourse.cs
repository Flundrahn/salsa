using System.ComponentModel.DataAnnotations;

namespace ordina.api.Models.DTOs;
public class CreateCourse
{
    public string? Location { get; set; } //e.g., Stockholm, Amsterdam
    public string? Season { get; set; } //e.g., summer, winter
    public string? Subject { get; set; } //e.g., dnfs, javascript
    
    [DataType(DataType.Date)]
    public DateTime StartDate { get; set; }

}
using System.ComponentModel.DataAnnotations;

namespace salsa.api.Models
{
  public class Course
  {
    public int? CourseId { get; set; }
    public string? Location { get; set; } //e.g., Stockholm, Amsterdam
    public string? Season { get; set; } //e.g., summer, winter
    public string? Subject { get; set; } //e.g., .net, javascript
    
    [DataType(DataType.Date)]
    public DateTime StartDate { get; set; }
  }
}
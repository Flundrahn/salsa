using System.ComponentModel.DataAnnotations;

public class UpdateCourse
{
    [Required]
    public int CourseId { get; set; }
    [Required]
    public string? Location { get; set; }
    [Required]
    public string? Season { get; set; }
    [Required]
    public string? Subject { get; set; }
    [Required]
    [DataType(DataType.Date)]
    public DateTime StartDate { get; set; }
}
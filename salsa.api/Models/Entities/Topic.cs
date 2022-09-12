namespace salsa.api.Models
{
  public class Topic
  {
    public int TopicId { get; init; }
    public int Day { get; set; }
    public DateTime Date {get; set; }
    public string Title { get; set; } = null!;
    public int? WeekId { get; set; }
    public ICollection<Resource>? Resources { get; set; }
  }
}
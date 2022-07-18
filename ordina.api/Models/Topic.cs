namespace ordina.api.Models
{
  public class Topic
  {
    public int TopicId { get; set; }
    public string Title { get; set; }
    public int WeekId { get; set; }
    public int Day { get; set; }
    public ICollection<Resource> Resources { get; set; }
  }
}
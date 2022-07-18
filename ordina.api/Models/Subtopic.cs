namespace ordina.api.Models
{
  public class Subtopic
  {
    public int SubtopicId { get; set; }
    public string Title { get; set; }
    public int TopicId { get; set; }
    public ICollection<Resource> Resources { get; set; }
  }
}
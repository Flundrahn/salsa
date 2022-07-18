namespace ordina.api.Models
{
  public class Topic
  {
    public int TopicId { get; set; }
    public string Title { get; set; }
    public ICollection<Subtopic> Subtopics { get; set; }
  }
}
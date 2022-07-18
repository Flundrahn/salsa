namespace ordina.api.Models.DTOs
{ 
  public class WeekExtResp
  {
    public int WeekId { get; set; }
    public string Title { get; set; }
    public int WeekNumber { get; set; }
    public IEnumerable<TopicResp>? Topics { get; set; }
  }
}
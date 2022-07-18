namespace ordina.api.Models
{
  public class Week
  {
    public int? WeekId { get; set; }
    public string Title { get; set; }
    public int WeekNumber { get; set; }
    public ICollection<Topic>? Topics { get; set; }
  }
}
namespace salsa.api.Models
{
  public class Week
  {
    public int WeekId { get; init; }
    public int WeekNumber { get; set; }
    public DateTime StartingDate {get; set; }
    public string Title { get; set; } = null!;
    public ICollection<Topic>? Topics { get; set; }
  }
}
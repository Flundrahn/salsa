using System.ComponentModel.DataAnnotations.Schema;

namespace salsa.api.Models;
public class Resource
{
  public int ResourceId { get; init; }
  [Column("ResourceType")]
  public ResourceType ResourceType { get; set; }
  public string Title { get; set; } = null!;
  public string Link { get; set; } = null!;
  [ForeignKey("TopicId")]
  public int? TopicId { get; set; }
}
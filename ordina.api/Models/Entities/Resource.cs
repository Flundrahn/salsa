using System.ComponentModel.DataAnnotations.Schema;

namespace ordina.api.Models;
public class Resource
{
  public int? ResourceId { get; set; }
  [Column("ResourceType")]
  public ResourceType ResourceType { get; set; }
  public string Title { get; set; }
  public string Link { get; set; }
  public int? TopicId { get; set; }
}
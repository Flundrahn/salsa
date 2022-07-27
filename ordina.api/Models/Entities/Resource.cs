using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Newtonsoft.Json.Converters;

namespace ordina.api.Models;
public class Resource
{
  public int? ResourceId { get; set; }
  [Column("ResourceType")]
  public ResourceType ResourceType { get; set; }
  public string Title { get; set; }
  public string Link { get; set; }
  [ForeignKey("TopicId")]
  public int? TopicId { get; set; }
}
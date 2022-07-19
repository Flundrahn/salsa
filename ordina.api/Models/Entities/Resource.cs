using System.Text.Json.Serialization;
using Newtonsoft.Json.Converters;

namespace ordina.api.Models;
public class Resource
{
  public int? ResourceId { get; set; }
  [JsonConverter(typeof(StringEnumConverter))]
  public Type Type { get; set; }
  public string Title { get; set; }
  public string Link { get; set; }
  public int? TopicId { get; set; }
}
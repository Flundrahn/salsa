namespace salsa.api.Models;
public class ResourceResponse
{
    public int ResourceId { get; set; }
    public ResourceType ResourceType { get; set; }
    public string Title { get; set; }
    public string Link { get; set; }
    public int TopicId { get; set; }
    public int? TopicDay { get; set; }
}
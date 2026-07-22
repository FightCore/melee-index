using MeleeIndex.Models.Serialization;

namespace MeleeIndex.Models.Abstract;

public abstract class DocumentEntity<TData> : TrackableEntity
    where TData : JsonExtendableData
{
    public string DocumentId { get; set; }
    
    public DateTime? PublishedAt { get; set; }
    
    public int StrapiId { get; set; }
    
    public TData Data { get; set; }
}

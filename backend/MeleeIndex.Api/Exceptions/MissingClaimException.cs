namespace MeleeIndex.Api.Exceptions
{
    public class MissingClaimException : Exception
    {
        public MissingClaimException(string message) : base(message)
        {
        }
    }
}

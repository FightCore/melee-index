namespace MeleeIndex.Api.Errors;

public class ValidatorError
{
    public required string Property { get; init; }

    public required string ErrorMessage { get; init; }

    public required string ErrorCode { get; init; }
}

using FluentValidation.Results;

namespace MeleeIndex.Api.Errors;

public class ValidatorApiError : ApiError
{
    public required List<ValidatorError> Errors { get; init; }

    private ValidatorApiError()
    {
        ErrorCode = "VALIDATOR_ERROR";
        ErrorMessage = "One or more validators have failed, see the \"errors\" field for more information.";
    }

    public static ValidatorApiError Create(ValidationResult validationResult)
    {
        return new ValidatorApiError()
        {
            Errors = [.. validationResult.Errors.Select(failure => new ValidatorError()
            {
                ErrorCode = failure.ErrorCode,
                ErrorMessage = failure.ErrorMessage,
                Property = failure.PropertyName
            })]
        };
    }
}

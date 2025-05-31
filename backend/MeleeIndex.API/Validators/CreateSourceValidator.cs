using FluentValidation;
using MeleeIndex.Contracts.Sources;

namespace MeleeIndex.Api.Validators
{
    public class CreateSourceValidator : AbstractValidator<CreateSourceModel>
    {
        public CreateSourceValidator()
        {
            RuleFor(source => source.Name)
                .NotEmpty()
                .WithMessage("Name is required.");
            RuleFor(source => source.Url)
                .NotEmpty()
                .WithMessage("URL is required.")
                .Must(HttpsUrlValidator.IsValidHttpsUrl)
                .WithMessage("URL is not valid.");
        }
    }
}

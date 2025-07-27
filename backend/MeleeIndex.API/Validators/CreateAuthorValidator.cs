using FluentValidation;
using MeleeIndex.Contracts.Authors;

namespace MeleeIndex.Api.Validators;

public class CreateAuthorValidator : AbstractValidator<CreateAuthorModel>
{
    public CreateAuthorValidator()
    {
        RuleFor(author => author.Name).NotEmpty();
        RuleFor(author => author.ImageUrl).NotEmpty();
        RuleFor(author => author.ImageUrl).Must(HttpsUrlValidator.IsValidHttpsUrl).WithErrorCode("invalid_url").WithMessage("Invalid URL");
    }
}

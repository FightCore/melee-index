using FluentValidation;
using MeleeIndex.Contracts.Tags;

namespace MeleeIndex.Api.Validators
{
    public class CreateTagValidator : AbstractValidator<CreateTagModel>
    {
        public CreateTagValidator()
        {
            RuleFor(tag => tag.Name)
                .NotEmpty()
                .WithMessage("Tag name cannot be empty.")
                .MaximumLength(50)
                .WithMessage("Tag name cannot exceed 50 characters.")
                .Must(tag => tag.All(tagChar => !char.IsLetter(tagChar) || char.IsLower(tagChar)))
                .WithMessage("Tag should be all lower case");
        }
    }
}

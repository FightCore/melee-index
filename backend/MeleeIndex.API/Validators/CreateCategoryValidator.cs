using FluentValidation;
using MeleeIndex.Contracts.Categories;

namespace MeleeIndex.Api.Validators
{
    public class CreateCategoryValidator : AbstractValidator<CreateCategoryModel>
    {
        public CreateCategoryValidator()
        {
            RuleFor(category => category.Name)
                .NotEmpty()
                .WithMessage("Name cannot be empty.")
                .MaximumLength(50)
                .WithMessage("Name cannot be longer than 50 characters.");
            RuleFor(category => category.Color)
                .NotEmpty()
                .WithMessage("Color cannot be empty.");
            // TODO Build validator for tailwind background class
            //.Matches(@"^#[0-9A-Fa-f]{6}$")
            //.WithMessage("Color must be a valid hex color code.");
        }
    }
}

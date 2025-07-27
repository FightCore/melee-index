using FluentValidation;
using MeleeIndex.Contracts.Posts;

namespace MeleeIndex.Api.Validators;

public class CreatePostValidator : AbstractValidator<CreatePostModel>
{
    public CreatePostValidator()
    {
        RuleFor(post => post.Title).NotEmpty();
        RuleFor(post => post.Summary).NotEmpty();
        RuleFor(post => post.Url).Must(HttpsUrlValidator.IsValidHttpsUrl).WithMessage("Invalid URL");
        RuleFor(post => post.Author).NotEmpty();
        RuleFor(post => post.Source).NotEmpty();
        RuleFor(post => post.Category).NotEmpty();
        RuleFor(post => post.Tags).NotEmpty();

        RuleFor(post => post.Created).LessThan(DateTime.UtcNow);
        RuleFor(post => post.Modified).LessThan(DateTime.UtcNow);
    }
}

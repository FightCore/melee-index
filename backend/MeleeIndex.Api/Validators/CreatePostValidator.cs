using FluentValidation;
using MeleeIndex.Contracts.Posts;

namespace MeleeIndex.Api.Validators;

public class CreatePostValidator : AbstractValidator<CreatePostModel>
{
    public CreatePostValidator()
    {
        RuleFor(post => post.Title).NotEmpty();
        RuleFor(post => post.Summary).NotEmpty();
        
        RuleFor(post => post.Created).LessThan(DateTime.UtcNow);
        RuleFor(post => post.Modified).LessThan(DateTime.UtcNow);
    }
}

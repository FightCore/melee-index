
using FluentValidation;
using MeleeIndex.Contracts.Users;

namespace MeleeIndex.Api.Validators;

public class UpdateUserValidator : AbstractValidator<UpdateUserModel>
{
    public UpdateUserValidator()
    {
        RuleFor(x => x.Username).NotEmpty().MaximumLength(32);
    }
}

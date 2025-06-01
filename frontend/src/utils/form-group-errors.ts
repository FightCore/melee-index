import { FormGroup, ValidationErrors } from "@angular/forms";
import { ValidatorError } from "../models/errors/validator-error";

export function setErrorsOnFormGroup(
  formGroup: FormGroup,
  errors: ValidatorError[],
  propertyMap: Map<string, string>
) : void {
  if (!formGroup || !errors || !propertyMap) {
    return;
  }

  errors.forEach(error => {
    const property = propertyMap.get(error.property);
    if (property && formGroup.controls[property]) {
      const errors: ValidationErrors = {};
      errors[error.errorCode] = error.errorMessage;
      formGroup.controls[property].setErrors(errors);
      formGroup.controls[property].markAsTouched();
    }
  });
}

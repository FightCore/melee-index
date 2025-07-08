import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidatorErrorCodes } from '@/models/errors/validator-error-codes';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-form-validation-error',
  imports: [JsonPipe],
  templateUrl: './form-validation-error.component.html',
  styleUrl: './form-validation-error.component.scss',
})
export class FormValidationErrorComponent {
  @Input({ required: true }) control!: AbstractControl<unknown, unknown>;
  validatorErrorCodes = ValidatorErrorCodes;
}

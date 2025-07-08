import { HttpErrorResponse } from '@angular/common/http';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ErrorHandlerService } from '@/app/services/errors/error-handler.service';
import { FormGroup } from '@angular/forms';
import { setErrorsOnFormGroup } from '@/utils/form-group-errors';

export abstract class CreationDialog {
  constructor(
    protected readonly ref: DynamicDialogRef,
    protected readonly propertyMap: Map<string, string>,
    protected readonly errorHandlerService: ErrorHandlerService,
    protected readonly formGroup: FormGroup,
  ) {}

  close(): void {
    this.ref.close();
  }

  handleHttpError(error: HttpErrorResponse): void {
    const validationErrors =
      this.errorHandlerService.getOrHandleValidatorError(error);
    if (validationErrors) {
      setErrorsOnFormGroup(this.formGroup, validationErrors, this.propertyMap);
    }
  }
}

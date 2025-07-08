import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ValidatorError } from '@/models/errors/validator-error';
import { ApiError } from '@/models/errors/api-error';
import { ValidatorApiError } from '@/models/errors/validator-api-error';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private readonly messageService = inject(MessageService);


  getOrHandleValidatorError(err: HttpErrorResponse): ValidatorError[] | null {
    if (!err.error) {
      return null;
    }

    const apiError = err.error as ApiError;
    if (apiError.errorCode === 'VALIDATOR_ERROR') {
      return (apiError as ValidatorApiError).errors;
    }

    // TODO Handle other types of API errors
    console.log('Unexpected error: ', apiError.errorCode, apiError.errorMessage);
    this.messageService.add({
      severity: 'error',
      summary: 'Unexpected error',
      detail: `Error code: ${apiError.errorCode}, Message: ${apiError.errorMessage}`
    });

    return null;
  }
}

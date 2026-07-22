import { ValidatorErrorCode } from "./validator-error-codes";

export interface ValidatorError {
  property: string;
  errorCode: ValidatorErrorCode;
  errorMessage: string;
}

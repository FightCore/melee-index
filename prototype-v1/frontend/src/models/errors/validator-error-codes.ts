export type ValidatorErrorCode =
  | ValidatorErrorCodes.INVALID_URL
  | ValidatorErrorCodes.REQUIRED;

export enum ValidatorErrorCodes {
  INVALID_URL = 'invalid_url',
  REQUIRED = 'required',
}

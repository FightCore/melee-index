import { ApiError } from "./api-error";
import { ValidatorError } from "./validator-error";

export interface ValidatorApiError extends ApiError {
  errors: ValidatorError[];
}

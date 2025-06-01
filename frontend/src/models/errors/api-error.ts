import { ErrorCode } from "./error-code";

export interface ApiError {
  errorCode: ErrorCode;
  errorMessage: string;
}

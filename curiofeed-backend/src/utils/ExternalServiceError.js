import { ApiError } from "./ApiError.js";

export class ExternalServiceError extends ApiError {
  constructor(message = "External service failed") {
    super(502, message);
  }
}
import { HttpStatusCode } from '../enums/http-status.enum';

export function getFriendlyErrorMessage(statusCode?: number): string {
  switch (statusCode) {
    case HttpStatusCode.BadRequest:
      return 'Invalid request. Please check your input.';
    case HttpStatusCode.Unauthorized:
      return 'Unauthorized. Please log in.';
    case HttpStatusCode.Forbidden:
      return 'You do not have permission to perform this action.';
    case HttpStatusCode.NotFound:
      return 'Resource not found. It may have been deleted or moved.';
    case HttpStatusCode.Conflict:
      return 'Conflict detected. Please refresh and try again.';
    case HttpStatusCode.UnprocessableEntity:
      return 'Some fields contain invalid data. Please review and correct them.';
    case HttpStatusCode.InternalServerError:
      return 'A server error occurred. Please try again later.';
    case HttpStatusCode.BadGateway:
    case HttpStatusCode.ServiceUnavailable:
    case HttpStatusCode.GatewayTimeout:
      return 'The service is temporarily unavailable. Please try again later.';
   
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}

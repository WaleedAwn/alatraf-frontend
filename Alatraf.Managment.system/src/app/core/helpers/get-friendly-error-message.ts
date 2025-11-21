import { HttpStatusCode } from '../enums/http-status.enum';
import { ArabicHttpErrors } from '../locals/Arabic';

export function getFriendlyErrorMessage(statusCode?: number): string {
  switch (statusCode) {
    case HttpStatusCode.BadRequest:
      return ArabicHttpErrors[400];
    case HttpStatusCode.Unauthorized:
      return ArabicHttpErrors[401];
    case HttpStatusCode.Forbidden:
      return ArabicHttpErrors[403];
    case HttpStatusCode.NotFound:
      return ArabicHttpErrors[404];
    case HttpStatusCode.UnprocessableEntity:
      return ArabicHttpErrors[422];
    case HttpStatusCode.InternalServerError:
      return ArabicHttpErrors[500];
    case HttpStatusCode.BadGateway:
    case HttpStatusCode.ServiceUnavailable:
    case HttpStatusCode.GatewayTimeout:
      return ArabicHttpErrors[503];
    default:
      return ArabicHttpErrors.unknown;
  }
}

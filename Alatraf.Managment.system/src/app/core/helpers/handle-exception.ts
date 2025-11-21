import { environment } from '../../../environments/environment';
import { ClientErrorType } from '../enums/client-error-type.enum';
import { ArabicClientErrors } from '../locals/Arabic';
import { ApiResult } from '../models/ApiResult';

export function handleException<T>(error: any): ApiResult<T> {

  let message = ArabicClientErrors.unknown;

  // Timeout
  if (error.name === ClientErrorType.Timeout) {
    message = ArabicClientErrors.timeout;
  }

  // Network error OR status = 0
  else if (error.message?.includes(ClientErrorType.Network) || error.status === 0) {
    message = ArabicClientErrors.network;
  }

  // Cancelled request
  else if (error.name === ClientErrorType.Abort) {
    message = ArabicClientErrors.aborted;
  }

  // Browser offline
  else if (navigator && !navigator.onLine) {
    message = ArabicClientErrors.offline;
  }

  if (!environment.production) {
    console.error('Client Exception:', error);
  }

  return ApiResult.failure<T>(
    message,
    error?.message || error?.toString()
  );
}

import { environment } from '../../../environments/environment';
import { ClientErrorType } from '../enums/client-error-type.enum';
import { ApiResult } from '../models/ApiResult';

export function handleException<T>(error: any): ApiResult<T> {
  let message = 'An unexpected error occurred. Please try again.';

  if (error.name === ClientErrorType.Timeout) {
    message = 'The request timed out. Please check your connection.';
  } else if (error.message?.includes(ClientErrorType.Network) || error.status === 0) {
    message = 'Network error. Please check your internet connection.';
  } else if (error.name === ClientErrorType.Abort) {
    message = 'The request was cancelled.';
  } else if (navigator && !navigator.onLine) {
    message = 'You are offline. Please reconnect to the internet.';
  }

  if (!environment.production) {
    console.error('Client Exception:', error);
  }

  return ApiResult.failure<T>(
    message,
    error?.message || error?.toString()
  );
}

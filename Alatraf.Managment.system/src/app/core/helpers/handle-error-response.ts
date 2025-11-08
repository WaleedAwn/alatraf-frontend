import { HttpErrorResponse } from '@angular/common/http';
import { getFriendlyErrorMessage } from './get-friendly-error-message';
import { ProblemDetails } from '../models/ProblemDetails';
import { ApiResult } from '../models/ApiResult';
import { environment } from '../../../environments/environment';

export function handleErrorResponse<T>(error: HttpErrorResponse): ApiResult<T> {
  let problem: ProblemDetails | null = null;
  const content: any = error.error;

  try {
    if (typeof content === 'string') {
      problem = JSON.parse(content);
    } else if (typeof content === 'object') {
      problem = content as ProblemDetails;
    }
  } catch (e) {
    if (!environment.production) {
      console.warn('Failed to parse backend error as JSON', e);
    }
  }

  if (problem) {
    return ApiResult.failure<T>(
      problem.title || getFriendlyErrorMessage(error.status),
      problem.detail || 'An error occurred.',
      problem.status || error.status,
      problem.errors
    );
  }

  // Fallback
  const detail =
    typeof content === 'string' ? content : JSON.stringify(content ?? {});
  const message = getFriendlyErrorMessage(error.status);

  // Optional logging in dev mode
  if (!environment.production) {
    console.error('HTTP Error Response:', {
      status: error.status,
      message,
      detail,
      originalError: error,
    });
  }

  return ApiResult.failure<T>(message, detail, error.status);
}

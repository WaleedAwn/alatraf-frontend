import { HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { ArabicClientErrors } from "../../locals/Arabic";
import { ApiResult } from "../../models/ApiResult";
import { ProblemDetails } from "../../models/ProblemDetails";
import { getFriendlyErrorMessage } from "./get-friendly-error-message";

export function handleErrorResponse<T>(error: HttpErrorResponse): ApiResult<T> {

  let problem: ProblemDetails | null = null;
  const content: any = error.error;

  // Try parsing ProblemDetails (ASP.NET format)
  try {
    if (typeof content === 'string') {
      problem = JSON.parse(content);
    } else if (typeof content === 'object') {
      problem = content as ProblemDetails;
    }
  } catch (e) {
    if (!environment.production) {
      console.warn('فشل تحليل خطأ الخادم:', e);
    }
  }

  if (problem) {
    return ApiResult.failure<T>(
      problem.title || getFriendlyErrorMessage(error.status),                 // Arabic
      problem.detail || ArabicClientErrors.errorOccurred || 'حدث خطأ أثناء المعالجة.', // Arabic detail
      problem.status || error.status,
      problem.errors
    );
  }

  // Fallback when backend sends non-ProblemDetails error
  const detail =
    typeof content === 'string'
      ? content
      : JSON.stringify(content ?? {});

  const message = getFriendlyErrorMessage(error.status); // Arabic mapped

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

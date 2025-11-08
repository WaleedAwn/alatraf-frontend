// src/app/core/models/api-result.model.ts
export class ApiResult<T = any> {
  isSuccess: boolean = false;
  data?: T;
  errorMessage?: string;
  errorDetail?: string;
  statusCode?: number;
  validationErrors?: Record<string, string[]>;

  constructor(init?: Partial<ApiResult<T>>) {
    Object.assign(this, init);
  }

  // Factory for success responses
  static success<T>(data: T): ApiResult<T> {
    return new ApiResult<T>({
      isSuccess: true,
      data,
      statusCode: 200,
    });
  }

  // Factory for failure responses
  static failure<T>(
    errorMessage: string,
    errorDetail?: string,
    statusCode?: number,
    validationErrors?: Record<string, string[]>
  ): ApiResult<T> {
    return new ApiResult<T>({
      isSuccess: false,
      errorMessage,
      errorDetail,
      statusCode,
      validationErrors,
    });
  }

  //  Optional helper for validation errors
  get firstErrorMessage(): string | undefined {
    if (this.validationErrors) {
      const firstKey = Object.keys(this.validationErrors)[0];
      return this.validationErrors[firstKey]?.[0];
    }
    return this.errorMessage;
  }
}

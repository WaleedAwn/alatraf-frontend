import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResult } from '../models/ApiResult';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  protected baseUrl = environment.apiBaseUrl;

  constructor(protected http: HttpClient) {}
  protected buildUrl(endpoint: string): string {
    if (!endpoint.startsWith('/')) endpoint = `/${endpoint}`;
    return `${this.baseUrl}${endpoint}`;
  }

  protected get<T>(
    endpoint: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<ApiResult<T>> {
    return this.http.get<ApiResult<T>>(this.buildUrl(endpoint), {
      params,
      headers,
    });
  }

  protected post<T>(
    endpoint: string,
    body: any,
    headers?: HttpHeaders
  ): Observable<ApiResult<T>> {
    return this.http.post<ApiResult<T>>(this.buildUrl(endpoint), body, {
      headers,
    });
  }

  protected put<T>(
    endpoint: string,
    body: any,
    headers?: HttpHeaders
  ): Observable<ApiResult<T>> {
    return this.http.put<ApiResult<T>>(this.buildUrl(endpoint), body, {
      headers,
    });
  }

  protected delete<T>(
    endpoint: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<ApiResult<T>> {
    return this.http.delete<ApiResult<T>>(this.buildUrl(endpoint), {
      params,
      headers,
    });
  }
}

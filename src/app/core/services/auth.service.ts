
import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Observable,
  tap,
  catchError,
  finalize,
  throwError
} from 'rxjs';

import { API_CONFIG } from '../config/api.config';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse
} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);

  login(request: LoginRequest): Observable<LoginResponse> {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.login}`;

    return this.http.post<LoginResponse>(url, request);
  }

  register(
    request: RegisterRequest
  ): Observable<RegisterResponse> {

    const url =
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.register}`;

    console.group('[AuthService] Register API');

    console.log('HTTP Method:', 'POST');
    console.log('API URL:', url);

    // Never print passwords or other sensitive values.
    console.log('Request Payload:', {
      name: request.name,
      email: request.email,
      phone: request.phone,
      password: '[REDACTED]'
    });

    console.groupEnd();

    return this.http
      .post<RegisterResponse>(url, request)
      .pipe(
        tap((response) => {
          console.group('[AuthService] Registration Response');

          console.log('Response Body:', response);

          console.groupEnd();
        }),

        catchError((error: HttpErrorResponse) => {
          console.group('[AuthService] Registration Error');

          console.error('Request URL:', url);
          console.error('Status:', error.status);
          console.error('Status Text:', error.statusText);
          console.error('Error Message:', error.message);
          console.error('Backend Error Body:', error.error);

          if (error.status === 0) {
            console.error(
              'Possible network, CORS, connection, or server availability issue.'
            );
          }

          console.groupEnd();

          return throwError(() => error);
        }),

        finalize(() => {
          console.log(
            '[AuthService] Registration request completed.'
          );
        })
      );
  }
}

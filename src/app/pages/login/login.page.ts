import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonInput,
  IonIcon,
  IonButton,
  IonCheckbox
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import { finalize } from 'rxjs';
import {
  documentTextOutline,
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  logInOutline,
  logoFacebook,
  logoApple,
  alertCircleOutline
} from 'ionicons/icons';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest, LoginResponse } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonContent,
    IonInput,
    IonIcon,
    IonButton,
    IonCheckbox,
    FormsModule,
    RouterLink
  ]
})
export class LoginPage {

  private readonly authService = inject(AuthService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isSubmitting = false;
  errorMessage = '';

  constructor(private router: Router) {
    addIcons({
      documentTextOutline,
      mailOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      logInOutline,
      logoFacebook,
      logoApple,
      alertCircleOutline
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    this.errorMessage = '';

    const email = this.email.trim().toLowerCase();
    if (!email || !this.password) {
      this.errorMessage = !email
        ? 'Please enter your email address.'
        : 'Please enter your password.';
      console.warn('[LoginPage] Login blocked: required fields are missing.');
      return;
    }

    if (this.password.length < 4 || this.password.length > 20) {
      this.errorMessage = 'Password must be 4–20 characters long.';
      console.warn('[LoginPage] Login blocked: password length is invalid.');
      return;
    }

    if (this.isSubmitting) {
      return;
    }

    const request: LoginRequest = { email, password: this.password };
    this.isSubmitting = true;

    console.info('[LoginPage] Sending login request.', {
      method: 'POST',
      endpoint: '/api/auth/login',
      email: this.maskEmail(email)
    });

    this.authService.login(request)
      .pipe(finalize(() => {
        this.isSubmitting = false;
        this.changeDetector.markForCheck();
      }))
      .subscribe({
        next: (response) => {
          const token = this.getToken(response);
          console.info('[LoginPage] Login response received.', {
            fields: response && typeof response === 'object'
              ? Object.keys(response)
              : [],
            hasToken: Boolean(token),
            userId: response?.userId,
            message: response?.message
          });

          if (!token) {
            this.errorMessage =
              'Login succeeded, but the server did not return an authentication token. Check the login response format.';
            console.error('[LoginPage] Login response is missing a recognized token field.', {
              expectedFields: ['token', 'accessToken', 'jwt', 'data.token'],
              receivedFields: response && typeof response === 'object'
                ? Object.keys(response)
                : []
            });
            this.changeDetector.markForCheck();
            return;
          }

          sessionStorage.removeItem('authToken');
          localStorage.removeItem('authToken');
          const storage = this.rememberMe ? localStorage : sessionStorage;
          storage.setItem('authToken', token);

          this.errorMessage = '';
          console.info('[LoginPage] Login completed; navigating to home.');
          this.changeDetector.markForCheck();
          void this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = this.getLoginError(error);
          console.error('[LoginPage] Login request failed.', {
            status: error.status,
            statusText: error.statusText,
            code: error.error?.code,
            message: this.errorMessage
          });
          this.changeDetector.markForCheck();
        }
      });
  }

  private getLoginError(error: HttpErrorResponse): string {
    const backendMessage = error.error?.message;

    if (typeof backendMessage === 'string' && backendMessage.trim()) {
      return backendMessage;
    }

    if (error.status === 0) {
      return 'Cannot connect to the server. Check your connection and try again.';
    }

    switch (error.status) {
      case 400:
      case 401:
        return 'Email or password is incorrect.';
      case 403:
        return 'Your account is not allowed to sign in.';
      case 429:
        return 'Too many login attempts. Please wait and try again.';
      case 500:
      case 503:
        return 'The service is temporarily unavailable. Please try again later.';
      default:
        return 'Login failed. Please try again.';
    }
  }

  private getToken(response: unknown): string | undefined {
    if (!response || typeof response !== 'object') {
      return undefined;
    }

    const body = response as LoginResponse;
    const token = body.token
      ?? body.accessToken
      ?? body.jwt
      ?? body.data?.token
      ?? body.data?.accessToken
      ?? body.data?.jwt;

    return typeof token === 'string' && token.trim()
      ? token.trim()
      : undefined;
  }

  private maskEmail(email: string): string {
    const [localPart, domain] = email.split('@');
    if (!domain) {
      return '[invalid email]';
    }

    return `${localPart.slice(0, 1)}***@${domain}`;
  }

  forgotPassword(): void {
    alert('Forgot password functionality will be added later.');
  }
}

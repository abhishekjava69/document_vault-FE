
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  documentTextOutline,
  lockClosedOutline,
  mailOutline,
  personAddOutline,
  personOutline,
  phonePortraitOutline,
  shieldCheckmarkOutline,
  eyeOutline,
  eyeOffOutline,
  alertCircleOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';

import { finalize } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { RegisterRequest } from '../../models/user.model';

function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword
    ? null
    : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    IonInput,
    IonButton,
    RouterLink,
    ReactiveFormsModule
  ]
})
export class RegisterPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  showPassword = false;
  showConfirmPassword = false;

  registerForm = this.fb.nonNullable.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(254)
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10,15}$/)
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ]
      ],

      confirmPassword: [
        '',
        Validators.required
      ]
    },
    {
      validators: passwordMatchValidator
    }
  );

  constructor() {
    addIcons({
      documentTextOutline,
      lockClosedOutline,
      personOutline,
      mailOutline,
      phonePortraitOutline,
      shieldCheckmarkOutline,
      personAddOutline,
      eyeOutline,
      eyeOffOutline,
      alertCircleOutline,
      checkmarkCircleOutline
    });
  }

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isSubmitting) {
      return;
    }

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.getRawValue();

    const request: RegisterRequest = {
      name: formValue.name.trim(),
      email: formValue.email.trim(),
      phone: formValue.phone.trim(),
      password: formValue.password
    };

    this.isSubmitting = true;

    this.authService.register(request)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe({
        next: (response) => {
          this.successMessage =
            response?.message || 'Registration successful.';

          this.errorMessage = '';
          this.registerForm.reset();
          this.changeDetector.markForCheck();
        },

        error: (error: HttpErrorResponse) => {
          this.errorMessage = this.getRegistrationError(error);
          this.successMessage = '';
          this.changeDetector.markForCheck();

          // Keep this log free of passwords and other sensitive data.
          console.error('[RegisterPage] Registration failed', {
            status: error.status,
            code: error.error?.code,
            message: this.errorMessage
          });
        }
      });
  }

  private getRegistrationError(
    error: HttpErrorResponse
  ): string {
    // Prefer the message supplied by your Spring Boot API.
    const backendMessage = error.error?.message;

    if (
      typeof backendMessage === 'string' &&
      backendMessage.trim().length > 0
    ) {
      return backendMessage;
    }

    // Angular uses status 0 for network-level failures,
    // including many connection and CORS failures.
    if (error.status === 0) {
      return 'Unable to connect to the server. Please check your connection and try again.';
    }

    switch (error.status) {
      case 400:
        return 'Please check your registration details and try again.';

      case 401:
        return 'Authentication is required. Please try again.';

      case 403:
        return 'You do not have permission to perform this action.';

      case 404:
        return 'The registration service could not be found.';

      case 409:
        return 'Email or phone number is already registered.';

      case 429:
        return 'Too many requests. Please wait and try again.';

      case 500:
        return 'A server error occurred. Please try again later.';

      case 503:
        return 'The service is temporarily unavailable. Please try again later.';

      default:
        return 'Registration failed. Please try again.';
    }
  }
}

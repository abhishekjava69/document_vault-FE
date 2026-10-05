import { Component } from '@angular/core';
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
import {
  documentTextOutline,
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  logInOutline,
  logoFacebook,
  logoApple
} from 'ionicons/icons';

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

  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;

  constructor(private router: Router) {
    addIcons({
      documentTextOutline,
      mailOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      logInOutline,
      logoFacebook,
      logoApple
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    if (!this.email.trim()) {
      alert('Please enter your email');
      return;
    }

    if (!this.password.trim()) {
      alert('Please enter your password');
      return;
    }

    alert('Login successful');
    this.router.navigate(['/home']);
  }

  forgotPassword(): void {
    alert('Forgot password functionality will be added later.');
  }
}
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonIcon, IonInput } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  documentTextOutline,
  lockClosedOutline,
  mailOutline,
  personAddOutline,
  personOutline,
  phonePortraitOutline,
  shieldCheckmarkOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [IonContent, IonIcon, IonInput, IonButton, RouterLink]
})
export class RegisterPage {
  constructor() {
    addIcons({
      'person-outline': personOutline,
      'mail-outline': mailOutline,
      'phone-portrait-outline': phonePortraitOutline,
      'lock-closed-outline': lockClosedOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'person-add-outline': personAddOutline,
      'document-text-outline': documentTextOutline
    });
  }
}

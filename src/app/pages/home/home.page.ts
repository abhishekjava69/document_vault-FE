import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  chevronForwardOutline,
  cloudUploadOutline,
  folderOpenOutline,
  personCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    RouterLink
  ],
})
export class HomePage {
  constructor() {
    addIcons({
      chevronForwardOutline,
      cloudUploadOutline,
      folderOpenOutline,
      personCircleOutline
    });
  }
}
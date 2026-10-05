import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  chevronForwardOutline,
  cloudUploadOutline,
  documentLockOutline,
  folderOpenOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonContent, IonIcon],
})
export class HomePage {

  constructor(private router: Router) {
    addIcons({
      chevronForwardOutline,
      cloudUploadOutline,
      documentLockOutline,
      folderOpenOutline
    });
  }

  openStoreDocuments() {
    this.router.navigate(['/store-document']);
  }

  openDocuments() {
    this.router.navigate(['/documents']);
  }

}
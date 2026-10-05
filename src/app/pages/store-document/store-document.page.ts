import { Component } from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonIcon
} from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { documentOutline } from 'ionicons/icons';

@Component({
  selector: 'app-store-document',
  templateUrl: './store-document.page.html',
  styleUrls: ['./store-document.page.scss'],
  imports: [
    CommonModule,
    FormsModule,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton,
    IonIcon
  ]
})
export class StoreDocumentPage {

  documentName: string = '';

  category: string = '';

  description: string = '';

  selectedFile: File | null = null;

  constructor() {
    addIcons({ documentOutline });
  }


  /**
   * Called when user selects a file
   */
  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      this.selectedFile = input.files[0];

      console.log('Selected file:', this.selectedFile);

    }

  }


  /**
   * Convert bytes to KB / MB
   */
  getFileSize(size: number): string {

    if (size < 1024) {

      return size + ' B';

    }

    if (size < 1024 * 1024) {

      return (size / 1024).toFixed(2) + ' KB';

    }

    return (size / (1024 * 1024)).toFixed(2) + ' MB';

  }


  /**
   * Store document
   */
  storeDocument(): void {

    if (!this.documentName.trim()) {

      alert('Please enter document name');

      return;

    }


    if (!this.category) {

      alert('Please select document category');

      return;

    }


    if (!this.selectedFile) {

      alert('Please select a document');

      return;

    }


    console.log('Document Name:', this.documentName);

    console.log('Category:', this.category);

    console.log('Description:', this.description);

    console.log('File:', this.selectedFile);


    alert('Document details are ready to upload!');

  }

}
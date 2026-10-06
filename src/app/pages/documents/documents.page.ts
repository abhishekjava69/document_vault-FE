import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon, IonInput } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  chevronForwardOutline,
  documentTextOutline,
  searchOutline
} from 'ionicons/icons';

interface DocumentItem {
  name: string;
  category: string;
  description: string;
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonIcon,
    IonInput,
    RouterLink
  ]
})
export class DocumentsPage implements OnInit {

  searchTerm = '';
  documents: DocumentItem[] = [];
  filteredDocuments: DocumentItem[] = [];

  constructor() {
    addIcons({
      chevronBackOutline,
      chevronForwardOutline,
      documentTextOutline,
      searchOutline
    });
  }

  ngOnInit() {
    this.filteredDocuments = this.documents;
  }

  searchDocuments(): void {
    const query = this.searchTerm.trim().toLowerCase();

    this.filteredDocuments = this.documents.filter((document) =>
      [document.name, document.category, document.description]
        .some((value) => value.toLowerCase().includes(query))
    );
  }

}

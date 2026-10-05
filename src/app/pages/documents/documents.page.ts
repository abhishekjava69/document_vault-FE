import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonSearchbar,
  IonTitle,
  IonToolbar
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { documentTextOutline, folderOpenOutline } from 'ionicons/icons';

interface DocumentItem {
  name: string;
  category: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonIcon,
    IonSearchbar,
    IonTitle,
    IonToolbar
  ]
})
export class DocumentsPage implements OnInit {

  searchText = '';
  documents: DocumentItem[] = [];
  filteredDocuments: DocumentItem[] = [];

  constructor() {
    addIcons({ documentTextOutline, folderOpenOutline });
  }

  ngOnInit() {
    this.filteredDocuments = this.documents;
  }

  searchDocuments(): void {
    const query = this.searchText.trim().toLowerCase();

    this.filteredDocuments = this.documents.filter((document) =>
      [document.name, document.category, document.fileType]
        .some((value) => value.toLowerCase().includes(query))
    );
  }

}

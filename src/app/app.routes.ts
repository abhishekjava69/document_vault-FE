import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'store-document',
    loadComponent: () =>
      import('./pages/store-document/store-document.page')
        .then(m => m.StoreDocumentPage)
  },
  {
    path: 'documents',
    loadComponent: () =>
      import('./pages/documents/documents.page')
        .then(m => m.DocumentsPage)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
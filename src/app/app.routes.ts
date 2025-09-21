import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register-page/register-page.component').then(m => m.RegisterPageComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login-page/login-page.component').then(m => m.LoginPageComponent)
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./components/perfil/perfil.component').then(m => m.PerfilPageComponent)
  }
];
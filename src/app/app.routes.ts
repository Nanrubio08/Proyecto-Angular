import { Routes } from '@angular/router';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
    {path: '',redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'login',component: LoginPageComponent},
];

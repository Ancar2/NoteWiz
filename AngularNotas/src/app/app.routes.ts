import { Routes } from '@angular/router';
import { Body } from './components/dashboard/body/body';
import { Error404 } from './components/error/error404/error404';
import { Trash } from './components/private/trash/trash';
import { Register } from './components/public/register/register';
import { Login } from './components/public/login/login';
import { authBlockGuard } from './guards/auth-block-guard/auth-block-guard';
import { authGuard } from './guards/auth-guard/auth-guard';
import { HomeComponent } from './components/home/home';
import { Verify } from './components/public/verify/verify';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [authBlockGuard],
    component: HomeComponent
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: Body
  },
  {
    path: 'trash',
    canActivate: [authGuard],
    component: Trash
  },
  {
    path: 'register',
    canActivate: [authBlockGuard],
    component: Register
  },
   {
    path: 'verify',
    canActivate: [authBlockGuard],
    component: Verify
  },
  {
    path: 'login',
    canActivate: [authBlockGuard],
    component: Login
  },
  {
    path: "**",
    component: Error404,
    pathMatch: "full"
  },
];

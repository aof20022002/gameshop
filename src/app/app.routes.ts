import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { User } from './pages/user/user';
import { Admin } from './pages/admin/admin';
import { L } from '@angular/cdk/keycodes';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'register', component: Register },
  { path: 'user', component: User },
  { path: 'admin', component: Admin },
];

import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Admin } from './pages/admin/admin';

import { Users } from './pages/users/users';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'admin', component: Admin },
  { path: 'users', component: Users },
  { path: 'profile', component: Profile },
  { path: '', component: Login },
];

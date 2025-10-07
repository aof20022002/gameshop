import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Admin } from './pages/admin/admin';

import { Users } from './pages/users/users';
import { ProfileUser } from './pages/profile-user/profile-user';
import { ProfileAdmin } from './pages/profile-admin/profile-admin';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'admin', component: Admin },
  { path: 'users', component: Users },
  { path: 'profile-user', component: ProfileUser },
  { path: 'profile-admin', component: ProfileAdmin },
  { path: '', component: Login },
];

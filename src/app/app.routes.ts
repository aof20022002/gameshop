import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Admin } from './pages/admin/admin';

import { Users } from './pages/users/users';
import { ProfileUser } from './pages/profile-user/profile-user';
import { ProfileAdmin } from './pages/profile-admin/profile-admin';
import { A } from '@angular/cdk/keycodes';
import { AddGame } from './pages/admin/add-game/add-game';
import { EditGame } from './pages/admin/edit-game/edit-game';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'admin', component: Admin },
  { path: 'users', component: Users },
  { path: 'profile-user', component: ProfileUser },
  { path: 'profile-admin', component: ProfileAdmin },
  { path: 'add-game', component: AddGame },
  { path: 'edit-game', component: EditGame },
  { path: '', component: Login },
];

import { Component } from '@angular/core';
import { HeaderUser } from '../header-user/header-user';

@Component({
  selector: 'app-users',
  imports: [HeaderUser],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {}

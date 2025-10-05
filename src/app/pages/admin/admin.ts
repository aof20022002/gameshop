import { Component } from '@angular/core';
import { HeaderAdmin } from '../header-admin/header-admin';

@Component({
  selector: 'app-admin',
  imports: [HeaderAdmin],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {}

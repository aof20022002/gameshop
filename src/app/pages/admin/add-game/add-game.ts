import { Component } from '@angular/core';
import { ProfileAdmin } from '../../profile-admin/profile-admin';
import { HeaderAdmin } from '../../header-admin/header-admin';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-game',
  imports: [HeaderAdmin, RouterLink],
  templateUrl: './add-game.html',
  styleUrl: './add-game.scss',
})
export class AddGame {}

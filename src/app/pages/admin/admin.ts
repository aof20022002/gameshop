import { Component, OnInit } from '@angular/core';
import { HeaderAdmin } from '../header-admin/header-admin';
import { FormsModule } from '@angular/forms';
import { Api_Service } from '../../services/api/api_service';
import { Game } from '../../model/responses/game_get_res';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [HeaderAdmin, FormsModule, CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {
  games: Game[] = [];

  constructor(private api_Service: Api_Service) {}

  ngOnInit(): void {
    this.loadGames();
  }

  async loadGames() {
    this.games = await this.api_Service.getAllGames();
    console.log(this.games); // ตรวจสอบข้อมูล
  }
}

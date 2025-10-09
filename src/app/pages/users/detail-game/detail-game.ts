import { Component, OnInit } from '@angular/core';
import { HeaderUser } from '../../header-user/header-user';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Game } from '../../../model/responses/game_get_res';
import { Api_Service } from '../../../services/api/api_service';

@Component({
  selector: 'app-detail-game',
  imports: [HeaderUser, RouterLink, CommonModule, FormsModule],
  templateUrl: './detail-game.html',
  styleUrl: './detail-game.scss',
})
export class DetailGame implements OnInit {
  game: Game | null = null;

  constructor(private route: ActivatedRoute, private api_Service: Api_Service) {}

  async ngOnInit() {
    // ดึง id จาก URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      try {
        this.game = await this.api_Service.getGameById(id);
      } catch (error) {
        console.error('โหลดข้อมูลเกมล้มเหลว:', error);
      }
    }
  }

  addToCart(game: Game) {
    let cart: Game[] = [];
    const cartData = localStorage.getItem('cart');
  }
}

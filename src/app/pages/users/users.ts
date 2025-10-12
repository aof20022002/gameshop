import { Component, OnInit } from '@angular/core';
import { HeaderUser } from '../header-user/header-user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Api_Service } from '../../services/api/api_service';
import { Game } from '../../model/responses/game_get_res';
@Component({
  selector: 'app-users',
  imports: [HeaderUser, FormsModule, CommonModule, RouterLink],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  games: any[] = [];
  filteredGames: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchText: string = '';
  Game: Game | null = null;
  constructor(private api_Service: Api_Service, private router: Router) {}

  async ngOnInit() {
    const result = await this.api_Service.getAllGames();
    this.games = result;
    this.filteredGames = [...this.games];
    //ดึงประเภทไม่ซ้ำ
    this.categories = Array.from(new Set(this.games.map((g) => g.category)));
  }

  // กรองตามประเภท
  filterGames() {
    if (this.selectedCategory === '') {
      this.filteredGames = [...this.games];
    } else {
      this.filteredGames = this.games.filter((g) => g.category === this.selectedCategory);
    }

    // ถ้ามีคำค้นอยู่ ให้กรองต่ออีกชั้น
    if (this.searchText.trim() !== '') {
      this.searchGames();
    }
  }

  //ค้นหาเมื่อกดปุ่ม
  searchGames() {
    const keyword = this.searchText.trim().toLowerCase();

    // ถ้าไม่พิมพ์อะไร = แสดงตามประเภทที่เลือก
    if (keyword === '') {
      this.filterGames();
      return;
    }

    //  ค้นหาในหมวดที่เลือกเท่านั้น
    let baseList =
      this.selectedCategory === ''
        ? this.games
        : this.games.filter((g) => g.category === this.selectedCategory);

    this.filteredGames = baseList.filter((g) => g.title.toLowerCase().includes(keyword));
  }
  // ✅ ฟังก์ชันเพิ่มสินค้าลงตะกร้า
  async addToCartFromList(game: Game) {
    try {
      // ดึง uid จาก localStorage
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        alert('กรุณาเข้าสู่ระบบก่อน');
        this.router.navigate(['/login']);
        return;
      }

      const user = JSON.parse(userStr);
      const uid = user.uid || user.id;

      // เรียก API เพิ่มลงตะกร้า
      await this.api_Service.addToCart(uid, game.game_Id);
      alert(`เพิ่ม "${game.title}" ลงตะกร้าเรียบร้อยแล้ว ✅`);
    } catch (error: any) {
      console.error('เพิ่มลงตะกร้าล้มเหลว:', error);

      if (error.status === 400) {
        alert('มีสินค้านี้ในตะกร้าอยู่แล้ว');
      } else {
        alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    }
  }
  goToGameDetail(id: number) {
    this.router.navigate(['/detail-game', id]);
  }
}

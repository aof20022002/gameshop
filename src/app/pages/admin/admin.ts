import { Component, OnInit } from '@angular/core';
import { HeaderAdmin } from '../header-admin/header-admin';
import { FormsModule } from '@angular/forms';
import { Api_Service } from '../../services/api/api_service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Game } from '../../model/responses/game_get_res';

@Component({
  selector: 'app-admin',
  imports: [HeaderAdmin, FormsModule, CommonModule, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {
  games: any[] = [];
  filteredGames: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchText: string = '';
  Game: Game | null = null;

  constructor(private api_Service: Api_Service) {}

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

  async deleteGame(gameId: number) {
    const confirmed = confirm('คุณต้องการลบเกมนี้หรือไม่?');
    if (!confirmed) return;

    try {
      await this.api_Service.deleteGame(gameId);
      alert('ลบเกมสำเร็จ');

      // โหลดข้อมูลใหม่จาก API
      const result = await this.api_Service.getAllGames();
      this.games = result;
      this.filteredGames = [...this.games];
      this.categories = Array.from(new Set(this.games.map((g) => g.category)));

      // ถ้ามี filter อยู่ให้คงการกรอง
      if (this.selectedCategory || this.searchText.trim() !== '') {
        this.filterGames();
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบเกม:', error);
      alert('ไม่สามารถลบเกมได้ กรุณาลองใหม่อีกครั้ง');
    }
  }
}

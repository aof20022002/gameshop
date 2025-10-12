import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Api_Service } from '../../../services/api/api_service';
import { HeaderUser } from '../../header-user/header-user';
import { User } from '../../../model/User';
@Component({
  selector: 'app-game-library',
  imports: [CommonModule, HeaderUser],
  templateUrl: './game-library.html',
  styleUrl: './game-library.scss',
})
export class GameLibrary {
  gameLibrary: any = [];
  uid: number | null = null;
  constructor(
    private route: ActivatedRoute,
    private api_Service: Api_Service,
    private router: Router
  ) {}
  ngOnInit() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const storedUser = JSON.parse(userString) as User;
      this.uid = storedUser.uid;
      this.loadGameLibrary(this.uid);
    }
  }
  async loadGameLibrary(uid?: number) {
    if (!uid) return;
    try {
      this.gameLibrary = await this.api_Service.getGameLibrary(uid);
      console.log(this.gameLibrary);
    } catch (error) {
      console.error('โหลดข้อมูลเกมล้มเหลว:', error);
    }
  }
}

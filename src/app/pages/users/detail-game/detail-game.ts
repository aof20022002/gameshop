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

  constructor(
    private route: ActivatedRoute,
    private api_Service: Api_Service,
    private router: Router
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      try {
        this.game = await this.api_Service.getGameById(id);
      } catch (error) {
        console.error('โหลดข้อมูลเกมล้มเหลว:', error);
      }
    }
  }

  async addToCart(game: Game) {
    try {
      // ดึง uid จาก localStorage
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        return;
      }

      const user = JSON.parse(userStr);
      const uid = user.uid || user.id;

      // เรียก API เพิ่มลงตะกร้า
      const response = await this.api_Service.addToCart(uid, game.game_Id);

      alert(`เพิ่ม "${game.title}" ลงตะกร้าเรียบร้อยแล้ว`);

      // อัพเดทจำนวนในตะกร้า (ถ้ามี badge แสดงจำนวน)
      // สามารถเพิ่ม service สำหรับ broadcast event ได้
    } catch (error: any) {
      console.error('เพิ่มลงตะกร้าล้มเหลว:', error);

      if (error.status === 400) {
        alert('มีสินค้านี้ในตะกร้าอยู่แล้ว');
      } else {
        alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    }
  }
}

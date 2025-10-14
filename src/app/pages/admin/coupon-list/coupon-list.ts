import { Component } from '@angular/core';
import { HeaderAdmin } from '../../header-admin/header-admin';
import { CommonModule } from '@angular/common';
import { Api_Service } from '../../../services/api/api_service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-coupon-list',
  imports: [HeaderAdmin, CommonModule],
  templateUrl: './coupon-list.html',
  styleUrl: './coupon-list.scss',
})
export class CouponList {
  promotions: any[] = [];
  constructor(private api_Service: Api_Service, public router: Router) {}
  ngOnInit() {
    this.loadPromotions();
  }

  async loadPromotions() {
    try {
      this.promotions = await this.api_Service.getAllPromotions();
      console.log('Promotions loaded:', this.promotions);
    } catch (error) {
      console.error('Error loading promotions:', error);
    }
  }
  gotoaddPromo() {
    this.router.navigate(['/add-coupun']);
  }
  async editPromotion(id: number) {
    this.router.navigate(['/update-coupon', id]);
  }
  async deletePromotion(id: number) {
    console.log('Deleting promotion with ID:', id);
    if (!confirm('คุณแน่ใจหรือว่าต้องการลบโปรโมชั่นนี้?')) {
      return;
    }
    try {
      await this.api_Service.deletePromotion(id);
      alert('ลบโปรโมชั่นสำเร็จ');
      this.loadPromotions(); // รีโหลดรายการโปรโมชั่นหลังลบ
    } catch (error) {
      console.error('Error deleting promotion:', error);
      alert('เกิดข้อผิดพลาดในการลบโปรโมชั่น');
    }
  }
}

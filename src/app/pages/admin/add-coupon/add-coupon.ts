import { Component } from '@angular/core';
import { HeaderAdmin } from '../../header-admin/header-admin';
import { Api_Service } from '../../../services/api/api_service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-coupon',
  imports: [HeaderAdmin, CommonModule, FormsModule],
  templateUrl: './add-coupon.html',
  styleUrl: './add-coupon.scss',
})
export class AddCoupon {
  code: string = '';
  discountType: 'percent' | 'fixed' = 'fixed';
  discountValue: number = 0;
  usageLimit: number = 0;
  constructor(private api_Service: Api_Service, public router: Router) {}

  async onSubmit() {
    const fromData = new FormData();
    const promotionPayload = {
      code: this.code,
      discountType: this.discountType,
      discountValue: this.discountValue,
      usageLimit: this.usageLimit,
    };
    try {
      const response = await this.api_Service.createPromotion(promotionPayload);
      if (response) {
        console.log('Promotion created successfully:', response);
        alert('สร้างโปรโมชั่นสำเร็จ');
        this.router.navigate(['/coupon-list']);
        return;
      } else {
        alert('สร้างโปรโมชั่นไม่สำเร็จ');
        return;
      }
    } catch (error) {
      console.error('Error creating promotion:', error);
      alert('เกิดข้อผิดพลาดในการสร้างโปรโมชั่น');
      return;
    }
  }
  gotoCouponList() {
    this.router.navigate(['/coupon-list']);
  }
}

import { Component } from '@angular/core';
import { HeaderAdmin } from '../../header-admin/header-admin';
import { Api_Service } from '../../../services/api/api_service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-coupon',
  imports: [HeaderAdmin, CommonModule, FormsModule],
  templateUrl: './update-coupon.html',
  styleUrl: './update-coupon.scss',
})
export class UpdateCoupon {
  code: string = '';
  discountType: 'percent' | 'fixed' = 'fixed';
  discountValue: number = 0;
  usageLimit: number = 0;
  did: number = 0;
  constructor(
    private api_Service: Api_Service,
    public router: Router,
    private route: ActivatedRoute
  ) {}
  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.did = id;
    this.loadDataAsync(id);
  }
  async onSubmit() {
    try {
      const formData = {
        did: this.did,
        code: this.code,
        discountType: this.discountType,
        discountValue: this.discountValue,
        usageLimit: this.usageLimit,
      };
      await this.api_Service.editPromotion(this.did, formData);
      alert('แก้ไขโปรโมชั่นสำเร็จ!');
      this.gotoCouponList();
    } catch (error) {
      console.error('Error updating promotion:', error);
      alert('เกิดข้อผิดพลาดในการแก้ไขโปรโมชั่น');
    }
  }
  async loadDataAsync(id: number) {
    const reponse = await this.api_Service.getPromotionById(id);
    console.log('Data received from API:', reponse);
    if (reponse) {
      this.code = reponse.code;
      this.discountType = reponse.discountType;
      this.discountValue = reponse.discountValue;
      this.usageLimit = reponse.usageLimit;
    } else {
      console.error('No data returned for ID:', id);
      alert('ไม่พบข้อมูลโปรโมชั่นนี้');
    }
  }
  catch(error: any) {
    console.error('Error loading promotion data:', error);
    alert('เกิดข้อผิดพลาดในการโหลดข้อมูลโปรโมชั่น');
  }

  gotoCouponList() {
    this.router.navigate(['/coupon-list']);
  }
}

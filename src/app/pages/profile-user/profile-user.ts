import { Component } from '@angular/core';
import { HeaderUser } from '../header-user/header-user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/User';
import { Api_Service } from '../../services/api/api_service';

@Component({
  selector: 'app-profile-user',
  imports: [HeaderUser, CommonModule, RouterModule, FormsModule],
  templateUrl: './profile-user.html',
  styleUrl: './profile-user.scss',
})
export class ProfileUser {
  User: User | null = null;
  showEditCard = false;
  showTopupCard = false;
  topupAmount: number | null = null;
  presetAmounts = [100, 200, 500];
  constructor(private api: Api_Service) {}
  apiBaseUrl: string = 'https://gameshop-api-production.up.railway.app/';
  ngOnInit() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const storedUser = JSON.parse(userString) as User;
      this.loadDataAsync(storedUser.uid);
    }
  }

  get fullProfileImageUrl(): string {
    // ตรวจสอบว่ามีข้อมูลผู้ใช้งานและ profile_image แล้ว
    if (this.User && this.User.profile_image) {
      // ต่อ Base URL + พาธที่ดึงจาก DB
      return this.apiBaseUrl + this.User.profile_image;
    }
    // ถ้าไม่มีรูป หรือ User เป็น null/undefined ให้ใช้ placeholder
    return 'https://via.placeholder.com/100';
  }
  toggleTopupCard() {
    this.showTopupCard = !this.showTopupCard;
  }

  selectAmount(amount: number) {
    this.topupAmount = amount;
  }

  confirmTopup() {
    if (!this.topupAmount || this.topupAmount <= 0) {
      alert('กรุณาใส่จำนวนเงินที่ถูกต้อง');
      return;
    }
    alert(`เติมเงินสำเร็จ ${this.topupAmount} บาท`);
    this.toggleTopupCard();
    this.topupAmount = null;
  }

  //funtion Card แก้ไขโปรไฟล์
  toggleEditCard() {
    this.showEditCard = !this.showEditCard;
  }

  saveProfile() {
    alert('บันทึกข้อมูลสำเร็จ');
    this.toggleEditCard();
  }
  async loadDataAsync(uid: number) {
    try {
      this.User = await this.api.getUserById(uid);
    } catch (error) {
      console.error('Error loading user data:', error);
      // สามารถแสดง error message ให้ user ได้
    }
  }
}

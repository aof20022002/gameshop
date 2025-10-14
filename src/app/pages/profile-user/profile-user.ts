import { Component } from '@angular/core';
import { HeaderUser } from '../header-user/header-user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/User';
import { Api_Service } from '../../services/api/api_service';
import { Transaction } from '../../model/responses/Transaction_get_res';

@Component({
  selector: 'app-profile-user',
  imports: [HeaderUser, CommonModule, RouterModule, FormsModule],
  templateUrl: './profile-user.html',
  styleUrl: './profile-user.scss',
})
export class ProfileUser {
  User: User | null = null;
  fullname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  showEditCard = false;
  showTopupCard = false;
  wallte: number = 0;
  transactions: Transaction[] = [];
  topupAmount: number | null = null;
  presetAmounts = [100, 200, 500];
  profilePreview: string | ArrayBuffer | null = null; // สำคัญ!
  selectedFile: File | null = null;
  constructor(private api: Api_Service) {}
  apiBaseUrl: string = 'https://gameshop-api-production.up.railway.app/';
  ngOnInit() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const storedUser = JSON.parse(userString) as User;
      this.loadDataAsync(storedUser.uid);
      this.updateWalletAndTransactions(storedUser.uid);
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

  async confirmTopup() {
    if (!this.topupAmount || this.topupAmount <= 0) {
      alert('กรุณาใส่จำนวนเงินที่ถูกต้อง');
      return;
    }
    try {
      await this.api.topup(this.User?.uid || 0, this.topupAmount);
      await this.updateWalletAndTransactions(this.User?.uid || 0);
      alert(`เติมเงินสำเร็จ ${this.topupAmount} บาท`);
    } catch (error) {
      console.error('Top-up failed:', error);
      alert('เกิดข้อผิดพลาดในการเติมเงิน กรุณาลองใหม่อีกครั้ง');
      return;
    }
    this.toggleTopupCard();
    this.topupAmount = null;
  }

  //funtion Card แก้ไขโปรไฟล์
  toggleEditCard() {
    this.showEditCard = !this.showEditCard;
  }
  onFileSelected(event: any) {
    console.log('Event:', event); // Debug

    const file = event.target.files[0];
    console.log('File:', file); // Debug

    if (file) {
      // ตรวจสอบประเภทไฟล์
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        this.errorMessage = 'กรุณาเลือกไฟล์รูปภาพเท่านั้น (jpg, jpeg, png, gif)';
        return;
      }

      // ตรวจสอบขนาดไฟล์ (5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'ขนาดไฟล์ต้องไม่เกิน 5MB';
        return;
      }

      this.selectedFile = file;
      this.errorMessage = '';

      // อ่านไฟล์และแสดง preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log('Image loaded:', e.target.result?.substring(0, 50)); // Debug
        this.profilePreview = e.target.result;
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error); // Debug
      };
      reader.readAsDataURL(file);
    }
  }
  async saveProfile() {
    if (!this.User || !this.User.uid) {
      this.errorMessage = 'ไม่พบข้อมูลผู้ใช้';
      return;
    }
    if (this.password || this.confirmPassword) {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน';
        return;
      }
      if (this.password.length < 6) {
        // ตัวอย่างการตรวจสอบความยาวรหัสผ่าน
        this.errorMessage = 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร';
        return;
      }
    }

    const formData = new FormData();

    formData.append('Fullname', this.fullname);
    formData.append('Email', this.email);
    if (this.selectedFile) {
      formData.append('profile_image', this.selectedFile);
    }
    if (this.password) {
      formData.append('Password', this.password);
    }

    try {
      const updateUser = await this.api.ediUserByid(this.User.uid, formData);

      this.User = updateUser;
      this.fullname = updateUser.fullname;
      this.email = updateUser.email;
      this.User.profile_image = updateUser.profile_image;
      alert('แก้ไขข้อมูลสำเร็จ');
      this.toggleEditCard();
      this.selectedFile = null;
      this.profilePreview = null;
      this.password = '';
      this.confirmPassword = '';
      this.errorMessage = '';
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง');
    }
  }
  async loadDataAsync(uid: number) {
    try {
      this.User = await this.api.getUserById(uid);
      this.fullname = this.User.fullname;
      this.email = this.User.email;
    } catch (error) {
      console.error('Error loading user data:', error);
      // สามารถแสดง error message ให้ user ได้
    }
  }

  async updateWalletAndTransactions(uid: number) {
    try {
      const wallteData = await this.api.getwallet(uid);
      this.wallte = wallteData.balance;
      const transactionsData = await this.api.getTransactionHistory(uid);
      this.transactions = transactionsData as Transaction[];
    } catch (error) {
      console.error('Error updating wallet or transactions:', error); // อาจจะแสดงข้อความแจ้งเตือนว่าโหลดข้อมูลไม่สำเร็จ
    }
  }
  getDisplayAmount(transaction: Transaction): string {
    const value = transaction.type === 'เติมเงิน' ? transaction.amount : transaction.total_price;
    return value ? value.toFixed(2) : '0.00';
  }
}

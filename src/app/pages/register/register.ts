import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [MatIconModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  fullname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  profileImage: string = 'default.png';
  errorMessage: string = '';
  isLoading: boolean = false;
  selectedFile: File | null = null;
  profilePreview: string | ArrayBuffer | null = null;
  private apiUrl = 'http://localhost:5280/api/Auth/register';

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
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
        this.profilePreview = e.target.result; // Base64 string ของรูปภาพ
      };
      reader.readAsDataURL(file); // อ่านไฟล์เป็น Data URL
    }
  }

  register() {
    this.errorMessage = '';

    if (!this.fullname || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน';
      return;
    }

    if (!this.email.includes('@')) {
      this.errorMessage = 'รูปแบบอีเมลไม่ถูกต้อง';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'รหัสผ่านไม่ตรงกัน';
      return;
    }

    this.isLoading = true;

    // สร้าง FormData สำหรับส่งข้อมูลพร้อมไฟล์
    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('fullname', this.fullname);

    // เพิ่มไฟล์ถ้ามีการเลือก
    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile);
    }

    console.log('Sending register request');

    this.http.post<any>(this.apiUrl, formData).subscribe({
      next: (response) => {
        console.log('Register success:', response);
        this.isLoading = false;
        alert('สมัครสมาชิกสำเร็จ!');
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Register error:', error);
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก';
      },
    });
  }

  goToLogin() {
    this.router.navigate(['']);
  }
}

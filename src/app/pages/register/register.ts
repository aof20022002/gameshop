import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Api_Service } from '../../services/api/api_service';
import { lastValueFrom } from 'rxjs';

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
  errorMessage: string = '';
  profilePreview: string | ArrayBuffer | null = null; // สำคัญ!
  selectedFile: File | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private api: Api_Service,
    private cdr: ChangeDetectorRef
  ) {}
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
  goToLogin() {
    this.router.navigate(['']);
  }

  async register() {
    if (!this.fullname || !this.email || !this.password || !this.confirmPassword) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('รหัสผ่านไม่ตรงกัน');
      return;
    }

    const formData = new FormData();
    formData.append('fullname', this.fullname);
    formData.append('email', this.email);
    formData.append('password', this.password);

    if (this.selectedFile) {
      formData.append('profile_image', this.selectedFile);
    }

    try {
      const response = await this.api.register(formData);
      alert('สมัครสมาชิกสำเร็จ');
      this.goToLogin();
      console.log(response);
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
  }
}

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Api_Service } from '../../services/api/api_service';

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

  constructor(private router: Router, private userService: Api_Service) {}

  async register() {
    this.errorMessage = '';

    if (!this.fullname || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน';
      return;
    }

    if (!this.email.includes('@')) {
      this.errorMessage = 'รูปแบบอีเมลไม่ถูกต้อง';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'รหัสผ่านไม่ตรงกัน';
      return;
    }

    this.isLoading = true;

    try {
      const response = await this.userService.register({
        email: this.email,
        password: this.password,
        fullname: this.fullname,
        profileImage: this.profileImage,
      });

      console.log('Register success:', response);
      this.isLoading = false;
      alert('สมัครสมาชิกสำเร็จ!');
      this.router.navigate(['']);
    } catch (error: any) {
      console.error('Register error:', error);
      this.isLoading = false;
      this.errorMessage = error.error?.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก';
    }
  }

  goToLogin() {
    this.router.navigate(['']);
  }
}

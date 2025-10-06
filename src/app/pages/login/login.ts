import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import { Api_Service } from '../../services/api/api_service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private api_Service: Api_Service, private router: Router) {}
  email: string = '';
  password: string = '';

  async onLogin() {
    // เช็คว่ากรอกข้อมูลครบหรือไม่
    if (!this.email || !this.password) {
      alert('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }
    try {
      const res: any = await this.api_Service.login(this.email, this.password);
      console.log('Login response:', res);

      // เช็คว่า response มี user หรือไม่
      if (res && res.user) {
        // เก็บข้อมูล user ไว้ใน localStorage
        localStorage.setItem('user', JSON.stringify(res.user));

        // เช็ค role
        if (res.user.role === 'admin') {
          console.log('Redirecting to admin dashboard');
          this.router.navigate(['/admin']);
        } else if (res.user.role === 'user') {
          console.log('Redirecting to user home');
          this.router.navigate(['/users']);
        } else {
          // ถ้ามี role อื่นๆ
          console.log('Unknown role, redirecting to default page');
          this.router.navigate(['']);
        }
      } else {
        alert('ข้อมูลการเข้าสู่ระบบไม่ถูกต้อง');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      console.error('Error details:', err.error);
      console.error('Status:', err.status);

      if (err.status === 401) {
        alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      } else if (err.status === 400) {
        alert('ข้อมูลไม่ถูกต้อง');
      } else {
        alert('เกิดข้อผิดพลาด: ' + (err.error?.message || err.message));
      }
    }
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}

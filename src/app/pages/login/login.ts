import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';

import { Constants } from '../../config/constants';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router, private constants: Constants) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'กรุณากรอกอีเมลและรหัสผ่าน';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const apiUrl = `${this.constants.API_ENDPOINT}/Auth/login`;

    this.http
      .post<any>(apiUrl, {
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
          console.log('Login success:', response);
          this.isLoading = false;

          // เก็บข้อมูล user ใน localStorage
          localStorage.setItem('user', JSON.stringify(response));
          localStorage.setItem('uid', response.uid.toString());
          localStorage.setItem('role', response.role);

          // Redirect ตาม role
          if (response.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/users']);
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
        },
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

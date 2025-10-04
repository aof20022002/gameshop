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
  profilePreview: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  private apiUrl = 'https://gameshop-api-fsic.onrender.com/api/Auth/register';

  constructor(private http: HttpClient, private router: Router) {}

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.profilePreview = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //     this.profileImage = 'default.png';
  //   }
  // }

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

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'รหัสผ่านไม่ตรงกัน';
      return;
    }

    this.isLoading = true;

    const registerData = {
      email: this.email,
      password: this.password,
      fullname: this.fullname,
      profileImage: this.profileImage,
    };

    console.log('Sending register request:', registerData);

    this.http.post<any>(this.apiUrl, registerData).subscribe({
      next: (response) => {
        console.log('Register success:', response);
        this.isLoading = false;
        alert('สมัครสมาชิกสำเร็จ!');
        this.router.navigate(['/login']);
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

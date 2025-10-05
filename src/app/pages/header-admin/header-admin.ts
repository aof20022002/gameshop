import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  imports: [CommonModule, RouterLink],
  templateUrl: './header-admin.html',
  styleUrl: './header-admin.scss',
})
export class HeaderAdmin {
  constructor(private router: Router) {}
  logout(): void {
    localStorage.removeItem('token'); // ล้าง token หรือ session
    this.router.navigate(['']); // กลับไปหน้า login
  }
}

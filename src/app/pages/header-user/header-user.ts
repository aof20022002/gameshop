import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-user',
  imports: [CommonModule, RouterLink],
  templateUrl: './header-user.html',
  styleUrl: './header-user.scss',
})
export class HeaderUser {
  menuOpen = false;

  constructor(private router: Router) {}

  toggleMenu(event: Event): void {
    event.stopPropagation(); // ป้องกันคลิกทะลุ
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    // ถ้าคลิกนอกเมนูให้ปิด
    if (!target.closest('.profile-icon')) {
      this.menuOpen = false;
    }
  }

  logout(): void {
    // ล็อกเอาต์จริงๆล้าง  session
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}

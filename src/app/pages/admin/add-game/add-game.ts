import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProfileAdmin } from '../../profile-admin/profile-admin';
import { HeaderAdmin } from '../../header-admin/header-admin';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Api_Service } from '../../../services/api/api_service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [HeaderAdmin, RouterLink, FormsModule, CommonModule],
  templateUrl: './add-game.html',
  styleUrl: './add-game.scss',
})
export class AddGame implements OnInit {
  selectedCategory: string = '';
  categories: string[] = [];
  games: any[] = [];
  profilePreview: string | ArrayBuffer | null = null; // สำคัญ!
  selectedFile: File | null = null;
  errorMessage: string = '';
  constructor(private api_Service: Api_Service) {}

  async ngOnInit() {
    // ดึงข้อมูลเกมทั้งหมดก่อน
    const result = await this.api_Service.getAllGames();
    this.games = result;

    // จากนั้นดึงประเภทที่ไม่ซ้ำกัน
    this.getTypegmae();
  }

  getTypegmae() {
    // ดึงประเภทไม่ซ้ำ
    this.categories = Array.from(new Set(this.games.map((g) => g.category)));
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
}

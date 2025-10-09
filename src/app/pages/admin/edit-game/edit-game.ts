import { Component, OnInit } from '@angular/core';
import { HeaderAdmin } from '../../header-admin/header-admin';
import { Api_Service } from '../../../services/api/api_service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-game',
  imports: [HeaderAdmin, RouterLink, FormsModule, CommonModule],
  templateUrl: './edit-game.html',
  styleUrl: './edit-game.scss',
})
export class EditGame implements OnInit {
  gameId!: number; // id ของเกมที่จะ edit

  // ข้อมูลเกม
  title: string = '';
  detail: string = '';
  category: string = '';
  price: number = 0;
  profilePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  categories: string[] = [];
  games: any[] = [];

  constructor(
    private api_Service: Api_Service,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    // ดึง id จาก URL
    this.gameId = +this.route.snapshot.paramMap.get('id')!;

    // ดึงข้อมูลเกมทั้งหมด
    const result = await this.api_Service.getAllGames();
    this.games = result;

    // ดึงประเภทไม่ซ้ำ
    this.categories = Array.from(new Set(this.games.map((g) => g.category)));

    // หาเกมที่ต้องการแก้ไข
    const game = this.games.find((g) => g.game_Id === this.gameId);
    if (game) {
      this.title = game.title;
      this.detail = game.detail;
      this.category = game.category;
      this.price = game.price;
      this.profilePreview = game.image_url || null;
    } else {
      alert('ไม่พบเกมนี้');
      this.router.navigate(['/admin']);
    }
  }

  // ฟังก์ชันเลือกไฟล์ภาพ
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น (jpg, jpeg, png, gif)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('ขนาดไฟล์ต้องไม่เกิน 5MB');
        return;
      }

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // ฟังก์ชันแก้ไขเกม
  async onSubmit() {
    if (!this.title || !this.category || !this.price || !this.detail) {
      alert('กรุณากรอกข้อมูลเกมให้ครบถ้วน');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('category', this.category);
    formData.append('price', this.price.toString());
    formData.append('detail', this.detail);

    if (this.selectedFile) {
      formData.append('image_url', this.selectedFile);
    }

    try {
      const response = await this.api_Service.updateGame(this.gameId, formData);
      alert('แก้ไขเกมสำเร็จ');
      this.router.navigate(['/admin']);
      console.log(response);
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการแก้ไขเกม');
    }
  }
}

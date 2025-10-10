import { Component, OnInit } from '@angular/core';
import { HeaderUser } from '../../header-user/header-user';
import { Api_Service } from '../../../services/api/api_service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-game',
  imports: [HeaderUser, RouterLink, CommonModule, FormsModule],
  templateUrl: './cart-game.html',
  styleUrl: './cart-game.scss',
})
export class CartGame implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  uid: number | null = null;

  constructor(private api_Service: Api_Service) {}

  async ngOnInit() {
    // ดึงข้อมูล user จาก localStorage
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('กรุณาเข้าสู่ระบบก่อน');
      return;
    }

    const user = JSON.parse(userStr);
    this.uid = user.uid || user.id;
    await this.loadCart();
  }

  async loadCart() {
    if (!this.uid) return;
    try {
      this.cartItems = await this.api_Service.getCart(this.uid);
      this.total = this.cartItems.reduce((sum, item) => sum + item.price, 0);
    } catch (error) {
      console.error('โหลดตะกร้าล้มเหลว:', error);
    }
  }

  async removeItem(cartId: number) {
    if (!confirm('ต้องการลบสินค้านี้ออกจากตะกร้าหรือไม่?')) return;

    try {
      await this.api_Service.removeFromCart(cartId);
      alert('ลบสินค้าเรียบร้อย');
      await this.loadCart();
    } catch (error) {
      console.error('ลบสินค้าไม่สำเร็จ:', error);
      alert('เกิดข้อผิดพลาดในการลบสินค้า');
    }
  }

  async clearCart() {
    if (!this.uid) return;
    if (!confirm('ต้องการล้างตะกร้าทั้งหมดหรือไม่?')) return;

    try {
      await this.api_Service.clearCart(this.uid);
      alert('ล้างตะกร้าเรียบร้อย');
      await this.loadCart();
    } catch (error) {
      console.error('ล้างตะกร้าไม่สำเร็จ:', error);
    }
  }

  async checkout() {
    if (!this.uid) return;
    if (this.cartItems.length === 0) {
      alert('ตะกร้าว่างเปล่า');
      return;
    }
    try {
      await this.api_Service.checkout(this.uid);
      alert('สั่งซื้อเรียบร้อย');
      await this.loadCart();
    } catch (error) {}
  }
}

import { Component, OnInit } from '@angular/core';
import { HeaderUser } from '../header-user/header-user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [HeaderUser, CommonModule, RouterModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  showEditCard = false;
  showTopupCard = false;
  topupAmount: number | null = null;
  presetAmounts = [100, 200, 500];

  //funtion Card เติมเงิน
  toggleTopupCard() {
    this.showTopupCard = !this.showTopupCard;
  }

  selectAmount(amount: number) {
    this.topupAmount = amount;
  }

  confirmTopup() {
    if (!this.topupAmount || this.topupAmount <= 0) {
      alert('กรุณาใส่จำนวนเงินที่ถูกต้อง');
      return;
    }
    alert(`เติมเงินสำเร็จ ${this.topupAmount} บาท`);
    this.toggleTopupCard();
    this.topupAmount = null;
  }

  //funtion Card แก้ไขโปรไฟล์
  toggleEditCard() {
    this.showEditCard = !this.showEditCard;
  }
}

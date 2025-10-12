import { Component } from '@angular/core';
import { HeaderAdmin } from '../../header-admin/header-admin';
import { Api_Service } from '../../../services/api/api_service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-user',
  imports: [HeaderAdmin, CommonModule],
  templateUrl: './all-user.html',
  styleUrl: './all-user.scss',
})
export class AllUser {
  uid: number = 0;
  User: any[] = [];
  allUsers: any[] = [];
  constructor(private api_Service: Api_Service, private router: Router) {}
  ngOnInit() {
    this.uid = Number(localStorage.getItem('uid'));
    this.loadDataAsync();
  }

  async loadDataAsync() {
    this.allUsers = await this.api_Service.getAllUsers();
    this.User = this.allUsers.filter((user) => user.role !== 'admin');
    console.log(this.User);
  }
  async viewHistory(uid: number) {
    this.router.navigate(['user-history', uid]);
  }
  goBack() {}
}

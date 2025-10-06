import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Api_Service } from '../../services/api/api_service';

@Component({
  selector: 'app-register',
  imports: [MatIconModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  constructor(private http: HttpClient, private router: Router, private api: Api_Service) {}

  goToLogin() {
    this.router.navigate(['']);
  }

  onFileSelected(event: any) {}

  async register() {}
}

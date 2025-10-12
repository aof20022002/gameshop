import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Api_Service } from '../../../services/api/api_service';
import { HeaderAdmin } from '../../header-admin/header-admin';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../../model/responses/Transaction_get_res';
@Component({
  selector: 'app-user-history',
  imports: [HeaderAdmin, RouterLink, CommonModule],
  templateUrl: './user-history.html',
  styleUrl: './user-history.scss',
})
export class UserHistory {
  transactions: Transaction[] = [];
  constructor(
    private route: ActivatedRoute,
    private api_Service: Api_Service,
    private router: Router
  ) {}
  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDataAsync(id);
  }
  async loadDataAsync(uid: number) {
    const transactionsData = await this.api_Service.getTransactionHistory(uid);
    this.transactions = transactionsData as Transaction[];
  }
  getDisplayAmount(transaction: Transaction): string {
    const value = transaction.type === 'เติมเงิน' ? transaction.amount : transaction.total_price;

    // Use the Thai currency format 'th-TH' for clarity, or just .toFixed(2)
    return value ? value.toFixed(2) : '0.00';
  }
  goBack() {
    this.router.navigate(['all-user']);
  }
}

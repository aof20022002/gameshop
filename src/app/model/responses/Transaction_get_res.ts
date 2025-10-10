export interface PurchaseItem {
  gameName: string;
  gamePrice: number;
}

export interface Transaction {
  transaction_id: number;
  type: 'เติมเงิน' | 'ซื้อเกม';
  amount?: number;
  total_price?: number;
  date: string;
  purchase_items?: PurchaseItem[];
  detail: string;
}

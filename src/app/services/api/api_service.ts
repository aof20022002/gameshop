import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../config/constants';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Game } from '../../model/responses/game_get_res';

import { User } from '../../model/User';

@Injectable({
  providedIn: 'root',
})
export class Api_Service {
  constructor(private constants: Constants, private http: HttpClient) {}

  public async login(email: string, password: string) {
    const url = this.constants.API_ENDPOINT + '/Auth/login';
    const body = { email, password };
    const response = await lastValueFrom(this.http.post(url, body));
    return response;
  }

  public async getAllGames(options?: any) {
    const url = this.constants.API_ENDPOINT + '/Games';
    const response = await lastValueFrom(this.http.get(url));
    return response as Game[];
  }

  public async register(formData: FormData): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/Auth/Register`;
    try {
      const response = await lastValueFrom(this.http.post(url, formData));
      return response;
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  }
  public async getUserById(uid: number) {
    const url = this.constants.API_ENDPOINT + '/User/' + uid;
    const response = await lastValueFrom(this.http.get<User>(url));
    return response;
  }

  public async ediUserByid(uid: number, formData: FormData) {
    const url = this.constants.API_ENDPOINT + '/User/' + uid;
    const response = await lastValueFrom(this.http.put<User>(url, formData));
    return response;
  }
  //รออโยอัพ
  public async getGameById(gameId: number) {
    const url = this.constants.API_ENDPOINT + '/Games/' + gameId;
    const response = await lastValueFrom(this.http.get<Game>(url));
    return response;
  }

  public async addgame(formData: FormData): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/Games/AddGame`;
    try {
      const response = await lastValueFrom(this.http.post(url, formData));
      return response;
    } catch (error) {
      console.error('AddGame failed:', error);
      throw error;
    }
  }

  public async updateGame(gameId: number, formData: FormData): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/Games/${gameId}`;
    try {
      const response = await lastValueFrom(this.http.put(url, formData));
      return response;
    } catch (error) {
      console.error('Update game failed:', error);
      throw error;
    }
  }

  public async deleteGame(gameId: number): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/Games/${gameId}`;
    try {
      const response = await lastValueFrom(this.http.delete(url));
      return response;
    } catch (error) {
      console.error('Delete game failed:', error);
      throw error;
    }
  }

  // ==================== Cart APIs ====================

  public async addToCart(uid: number, gameId: number): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/Cart/AddToCart`;
    const body = { uid, game_id: gameId };
    const response = await lastValueFrom(this.http.post(url, body));
    return response;
  }

  public async getCart(uid: number): Promise<any[]> {
    const url = `${this.constants.API_ENDPOINT}/Cart/GetCart/${uid}`;
    const response = await lastValueFrom(this.http.get<any[]>(url));
    return response;
  }

  public async removeFromCart(cartId: number): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/Cart/RemoveFromCart/${cartId}`;
    const response = await lastValueFrom(this.http.delete(url));
    return response;
  }

  public async clearCart(uid: number): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/Cart/ClearCart/${uid}`;
    const response = await lastValueFrom(this.http.delete(url));
    return response;
  }

  public async checkout(uid: number): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/Orders/CreateOrder`;
    const body = { uid };
    const response = await lastValueFrom(this.http.post(url, { uid }));
    return response;
  }
  public async checkoutWithCode(uid: number, couponCode: string): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/Orders/CreateOrder`;
    const body = { uid, couponCode };
    const response = await lastValueFrom(this.http.post(url, body));
    return response;
  }
  public async topup(uid: number, balance: number): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/User/topup`;
    const body = { uid, balance };
    const response = await lastValueFrom(this.http.post(url, body));
    return response;
  }

  public async getwallet(uid: number): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/User/wallet/${uid}`;
    const response = await lastValueFrom(this.http.get(url));
    return response;
  }

  public async getTransactionHistory(uid: number): Promise<any[]> {
    const url = `${this.constants.API_ENDPOINT}/Orders/getTransactionByUserId/${uid}`;
    const response = await lastValueFrom(this.http.get<any[]>(url));
    return response;
  }

  public async getGameLibrary(uid: number): Promise<any[]> {
    const url = `${this.constants.API_ENDPOINT}/Games/getGameByUserId/${uid}`;
    const response = await lastValueFrom(this.http.get<any[]>(url));
    return response;
  }

  public async getAllUsers(): Promise<User[]> {
    const url = `${this.constants.API_ENDPOINT}/User`;
    const response = await lastValueFrom(this.http.get<User[]>(url));
    return response;
  }
  public async getAllPromotions(): Promise<any[]> {
    const url = `${this.constants.API_ENDPOINT}/Discount/getallcoupon`;
    const response = await lastValueFrom(this.http.get<any[]>(url));
    return response;
  }
  public async createPromotion(formData: any): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/Discount`;
    try {
      const response = await lastValueFrom(this.http.post(url, formData));
      return response;
    } catch (error) {
      console.error('Create promotion failed:', error);
      throw error;
    }
  }
  public async deletePromotion(promotionId: number): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/Discount/deletecoupon/${promotionId}`;
    try {
      const response = await lastValueFrom(this.http.delete(url));
      return response;
    } catch (error) {
      console.error('Delete promotion failed:', error);
      throw error;
    }
  }
  public async editPromotion(promotionId: number, formData: any): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/Discount/updatecoupon/${promotionId}`;
    try {
      const response = await lastValueFrom(this.http.put(url, formData));
      return response;
    } catch (error) {
      console.error('Edit promotion failed:', error);
      throw error;
    }
  }
  public async getPromotionById(promotionId: number): Promise<any> {
    const url = `${this.constants.API_ENDPOINT}/Discount/getAllcupon?did=${promotionId}`;
    try {
      const response = await lastValueFrom(this.http.get(url));
      return response;
    } catch (error) {
      console.error('Get promotion by ID failed:', error);
      throw error;
    }
  }
}

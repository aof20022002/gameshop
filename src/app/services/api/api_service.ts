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
}

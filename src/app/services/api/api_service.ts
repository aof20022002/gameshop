import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../config/constants';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Game } from '../../model/responses/game_get_res';
import { G } from '@angular/cdk/keycodes';

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
    const url = this.constants.API_ENDPOINT + '/Game';
    const response = await lastValueFrom(this.http.get(url));
    return response as Game[];
  }
}

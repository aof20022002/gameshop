import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../config/constants';
import { lastValueFrom } from 'rxjs';
import { RegisterRequest } from '../../model/requests/register_get_req';
import { RegisterResponse } from '../../model/responses/register_get_res';
import { UserResponse } from '../../model/responses/user_get_res';

@Injectable({
  providedIn: 'root',
})
export class Api_Service {
  constructor(private constants: Constants, private http: HttpClient) {}

  // public async getUser(uid: number): Promise<UserResponse> {
  //   const url = `${this.constants.API_ENDPOINT}User/user/${uid}`;
  //   const response = await lastValueFrom(this.http.get<UserResponse>(url));
  //   return response;
  // }

  // method login
  public async login(email: string, password: string) {
    const url = this.constants.API_ENDPOINT + '/Auth/login';
    const response = await lastValueFrom(this.http.post(url, { email, password }));
    return response as UserResponse;
  }

  // method register
  public async register(data: RegisterRequest) {
    const url = this.constants.API_ENDPOINT + '/Auth/register';
    const response = await lastValueFrom(this.http.post(url, data));
    return response as RegisterResponse;
  }
}

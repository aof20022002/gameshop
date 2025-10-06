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
}

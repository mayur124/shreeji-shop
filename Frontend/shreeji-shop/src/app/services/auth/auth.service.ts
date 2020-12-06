import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginRequest, ILoginResponse, IRegisterRequest } from 'src/app/models/authentication.model';
import { URLS } from '../../constants/constants'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(registerRequest: IRegisterRequest) {
    return this.http.post(URLS.SIGN_UP, registerRequest);
  }

  signIn(loginRequest: ILoginRequest) {
    return this.http.post<ILoginResponse>(URLS.LOGIN, loginRequest);
  }
}

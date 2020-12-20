import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { ILoginRequest, ILoginResponse, IRegisterRequest } from 'src/app/models/authentication.model';
import { URLS } from '../../constants/constants'
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) { }

  signUp(registerRequest: IRegisterRequest) {
    return this.http.post(URLS.SIGN_UP, registerRequest);
  }

  signIn(loginRequest: ILoginRequest) {
    return this.http.post<ILoginResponse>(URLS.LOGIN, loginRequest)
      .pipe(map(loginResponse => {
        if (loginResponse) {
          this._addDataInLocalStorage(loginResponse);
          this.loggedIn.emit(true);
          return true;
        } else {
          this._clearLocalStorage();
          this.loggedIn.emit(false);
          return false;
        }
      }));
  }

  getJwtToken(): string {
    return localStorage.getItem('authenticationToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  private _addDataInLocalStorage(loginResponse: ILoginResponse) {
    localStorage.setItem('authenticationToken', loginResponse.authenticationToken);
    localStorage.setItem('username', loginResponse.username);
    localStorage.setItem('expiresAt', new Date(loginResponse.expiresAt).toISOString());
    localStorage.setItem('refreshToken', loginResponse.refreshToken);
  }

  private _clearLocalStorage() {
    localStorage.clear();
  }
}

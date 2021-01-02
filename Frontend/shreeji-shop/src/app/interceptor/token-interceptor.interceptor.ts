import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { ILoginResponse } from '../models/authentication.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.indexOf('refresh') !== -1 ||
      request.url.indexOf('login') !== -1 ||
      request.url.indexOf('filter') !== -1 ||
      request.url.indexOf('signup') !== -1) {
      return next.handle(request);
    }
    const jwtToken = this.auth.getJwtToken();
    if (jwtToken) {
      return next.handle(this._addToken(request, jwtToken)).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 403) {
            return this._handleAuthError(request, next);
          }
          return throwError(error);
        })
      );
    }
    return next.handle(request);
  }

  private _handleAuthError(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.auth.refreshToken().pipe(
        switchMap((refreshTokenResponse: ILoginResponse) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
          return next.handle(this._addToken(request, refreshTokenResponse.authenticationToken));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap((_res) => {
          return next.handle(this._addToken(request, this.auth.getJwtToken()));
        })
      );
    }
  }

  private _addToken(request: HttpRequest<unknown>, jwtToken: string) {
    return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + jwtToken) });
  }
}

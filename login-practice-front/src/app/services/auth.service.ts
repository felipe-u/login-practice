import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private token: string;
  AUTH_SERVER: string = 'http:/localhost:3000';
  authSignal = signal(false);

  register(user: User) {
    return this.httpClient.post(`${this.AUTH_SERVER}/register`, user).pipe(
      tap((res: any) => {
        if (res) {
          // guardar token
          this.saveToken(res.dataUser.token, res.dataUser.expiresIn);
        }
      })
    )
  }

  login(user: User) {
    return this.httpClient.post(`${this.AUTH_SERVER}/login`, user).pipe(
      tap((res: any) => {
        if (res) {
          // guardar token
          this.saveToken(res.dataUser.token, res.dataUser.expiresIn);
        }
      })
    )
  }

  logout() {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
  }

  private saveToken(token: string, expiresIn: string) {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EXPIRES_IN', expiresIn);
    this.token = token;
  }

  private getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }
}

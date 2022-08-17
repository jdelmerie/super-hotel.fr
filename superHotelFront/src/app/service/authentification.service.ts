import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  isLogged: boolean = false;
  hasAdminRole: boolean = false;
  hasHotelierRole: boolean = false;
  hasUserRole: boolean = false;
  userRole: string = '';

  constructor(
    public router: Router,
    private http: HttpClient,
    private tokenStorage: TokenService
  ) {}

  login(username: string, password: string): Observable<any> {
    let credentials = '?username=' + username + '&password=' + password;
    return this.http.post(environment.host + '/login' + credentials, {
      username: username,
      password: password,
    });
  }

  isAdmin(): boolean {
    let jwt = this.tokenStorage.getToken();
    if (jwt !== null) {
      let decodedJwtJsonData = window.atob(jwt?.split('.')[1]);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      for (let r of decodedJwtData.roles) {
        if (r == 'ROLE_ADMIN') {
          this.hasAdminRole = true;
          this.userRole = 'ROLE_ADMIN';
        }
      }
    }
    return this.hasAdminRole;
  }

  isHotelier(): boolean {
    let jwt = this.tokenStorage.getToken();
    if (jwt !== null) {
      let decodedJwtJsonData = window.atob(jwt?.split('.')[1]);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      for (let r of decodedJwtData.roles) {
        if (r == 'ROLE_HOTELIER') {
          this.hasHotelierRole = true;
          this.userRole = 'ROLE_HOTELIER';
        }
      }
    }
    return this.hasHotelierRole;
  }

  isUser(): boolean {
    let jwt = this.tokenStorage.getToken();
    if (jwt !== null) {
      let decodedJwtJsonData = window.atob(jwt?.split('.')[1]);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      for (let r of decodedJwtData.roles) {
        if (r == 'ROLE_USER') {
          this.hasUserRole = true;
          this.userRole = 'ROLE_USER';
        }
      }
    }
    return this.hasUserRole;
  }

  checkIfLogged(): boolean {
    if (this.tokenStorage.getToken()) {
      this.isLogged = true;
    }
    return this.isLogged;
  }

  getUserRole() {
    return this.userRole;
  }
}

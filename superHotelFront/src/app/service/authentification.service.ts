import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService implements CanActivate {
  isLogged: boolean = false;
  hasAdminRole: boolean = false;
  hasHotelierRole: boolean = false;
  hasUserRole: boolean = false;

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
          }
      }
    }
    return this.hasUserRole;
  }

  canActivate(isAuth: any): boolean {
    if (!isAuth) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}

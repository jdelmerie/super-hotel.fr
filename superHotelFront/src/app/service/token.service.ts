import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private TOKEN = 'token';
  private USER_ID = 'userId';

  constructor() {}

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN);
    window.sessionStorage.setItem(this.TOKEN, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN);
  }

  public saveUserId(userId: number): void {
    window.sessionStorage.removeItem(this.USER_ID);
    window.sessionStorage.setItem(this.USER_ID, JSON.stringify(userId));
  }

  public getUserId(): any {
    const userId = window.sessionStorage.getItem(this.USER_ID);
    if (userId) {
      return JSON.parse(userId);
    }
    return {};
  }

  signOut(): void {
    window.sessionStorage.clear();
  }
}

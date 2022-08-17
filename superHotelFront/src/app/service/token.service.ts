import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private TOKEN = 'token';

  constructor() {}

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN);
    window.sessionStorage.setItem(this.TOKEN, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN);
  }

  signOut(): void {
    window.sessionStorage.clear();
  }
}

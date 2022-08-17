import { Component, ViewEncapsulation } from '@angular/core';
import { AuthentificationService } from './service/authentification.service';
import { TokenService } from './service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'superHotelFront';

  isLogged: boolean = false;
  isAdmin: boolean = false;
  isHotelier: boolean = false;
  isUser: boolean = false;

  constructor(
    private auth: AuthentificationService,
    private token: TokenService
  ) {}

  ngOnInit(): void {
    if (this.auth.isAdmin()) {
      this.isAdmin = true;
      this.isLogged = true;
      console.log("un admin est co")
    }

    if (this.auth.isHotelier()) {
      this.isHotelier = true;
      this.isLogged = true;
      console.log("un hotelier est co")
    }

    if (this.auth.isUser()) {
      this.isUser = true;
      this.isLogged = true;
      console.log("un user est co")
    }
  }

  logout() {
    this.isLogged = false;
    this.token.signOut();
    window.location.reload();
  }
}

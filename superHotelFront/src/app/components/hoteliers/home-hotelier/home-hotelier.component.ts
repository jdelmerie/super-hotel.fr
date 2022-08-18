import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel';
import { Hotelier } from 'src/app/models/hotelier';
import { ApiService } from 'src/app/service/api.service';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { TokenService } from 'src/app/service/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-hotelier',
  templateUrl: './home-hotelier.component.html',
  styleUrls: ['./home-hotelier.component.css'],
})
export class HomeHotelierComponent implements OnInit {
  hotels: Hotel[] | undefined;
  error: null | undefined;
  url: string = environment.host + '/hotel/image/';
  file: File | undefined;
  hotelier: Hotelier | undefined;

  constructor(
    private auth: AuthentificationService,
    private router: Router,
    private api: ApiService,
    private token: TokenService
  ) {}

  ngOnInit(): void {
    if (this.auth.isHotelier()) {
      let userId = this.token.getUserId();
      this.api.getHotelierByUserId(userId).subscribe({
        next: (data) => {
          this.hotelier = data;
          this.api.getHotelsByHotelierId(this.hotelier.id).subscribe({
            next: (data) => this.hotels = data
          })
        },
      });
    } else {
      if (this.auth.isAdmin() || this.auth.isUser()) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login');
      }
    }
  }

  onUpdate(hotel: Hotel) {
    this.router.navigateByUrl('hotelier/hotel/' + hotel.id);
  }
}

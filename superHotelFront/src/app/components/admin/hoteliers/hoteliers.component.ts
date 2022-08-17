import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel';
import { Hotelier } from 'src/app/models/hotelier';
import { ApiService } from 'src/app/service/api.service';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-hoteliers',
  templateUrl: './hoteliers.component.html',
  styleUrls: ['./hoteliers.component.css']
})
export class HoteliersComponent implements OnInit {

  hoteliers: Hotelier[] | undefined;
  hotels: Hotel[] | undefined;
  error: null | undefined;

  constructor(private auth: AuthentificationService, private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    if (this.auth.isAdmin()) {
      this.getAllHoteliers() 
    } else {
      if (this.auth.isHotelier() || this.auth.isUser()) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login');
      }
    }
  }

  getAllHoteliers() {
    this.api.getHoteliers().subscribe({
      next: (data) => (this.hoteliers = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }
}

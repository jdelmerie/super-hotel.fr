import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { Hotel } from 'src/app/models/hotel';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
})
export class HotelsComponent implements OnInit {
  cityId: number = 0;
  cities: City[] | undefined;
  hotels: Hotel[] | undefined;
  error = null;
  url: string = environment.host + '/hotel/image/';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCities();
    this.getAllHotels();
  }

  getAllCities() {
    this.api.getCities().subscribe({
      next: (data) => (this.cities = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  getByCities(id: number) {
    this.cityId = id;
    this.api.getHotelsByCity(id).subscribe({
      next: (data) => (this.hotels = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  getAllHotels() {
    this.cityId = 0;
    this.api.getHotels().subscribe({
      next: (data) => (this.hotels = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  displayHotel(hotel: Hotel) {
    this.router.navigateByUrl('hotel/' + hotel.id);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  myForm: FormGroup;
  
  constructor(private api: ApiService, private router: Router,  private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      search: [''],
    });
  }

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

  onSearch(myForm: FormGroup) {
    this.api.searchByCityName(myForm.value.search).subscribe({
      next: (data) => {
        this.hotels = data;
        this.cityId = data.length > 0 ? data[0].city.id : 0
      },
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }
}

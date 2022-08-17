import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { ApiService } from 'src/app/service/api.service';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent implements OnInit {
  
  cities: City[] | undefined;
  error: null | undefined;

  constructor(private auth: AuthentificationService, private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    if (this.auth.isAdmin()) {
      this.getAllCities() 
    } else {
      if (this.auth.isHotelier() || this.auth.isUser()) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login');
      }
    }
  }

  getAllCities() {
    this.api.getCities().subscribe({
      next: (data) => (this.cities = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }
}

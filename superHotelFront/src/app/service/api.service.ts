import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { City } from '../models/city';
import { Hotel } from '../models/hotel';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private authHeader = new HttpHeaders({
    Authorization: 'Bearer ' + this.token.getToken(),
  });

  constructor(private http: HttpClient, private token: TokenService) {}

  /**************************************************************
   *
   * CITY
   *
   **************************************************************/
  public getCities() {
    return this.http.get<City[]>(environment.host + '/city/all');
  }

  /**************************************************************
   *
   * HOTEL
   *
   **************************************************************/
  public getHotels() {
    return this.http.get<Hotel[]>(environment.host + '/hotel/all');
  }

  public getHotelsByCity(id: number) {
    return this.http.get<Hotel[]>(environment.host + '/hotel/city/' + id);
  }

  public getHotel(id: number) {
    return this.http.get<Hotel>(environment.host + '/hotel/get/' + id);
  }
}

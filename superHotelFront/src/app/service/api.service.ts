import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { City } from '../models/city';
import { Hotel } from '../models/hotel';
import { Hotelier } from '../models/hotelier';
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

  public searchByCityName(search: string) {
    return this.http.get<Hotel[]>(
      environment.host + '/hotel/city/search/' + search
    );
  }

  public getHotel(id: number) {
    return this.http.get<Hotel>(environment.host + '/hotel/get/' + id);
  }

  public addHotel(hotel: Hotel) {
    return this.http.post<Hotel>(environment.host + '/hotel/add', hotel, {
      headers: this.authHeader,
    });
  }

  public updateHotel(hotel: Hotel) {
    return this.http.put<Hotel>(environment.host + '/hotel/update/' + hotel.id, hotel, {
      headers: this.authHeader,
    });
  }
  
  public uploadImage(imageData: FormData) {
    return this.http.post(environment.host + '/hotel/uploadImage', imageData, {
      headers: this.authHeader,
    });
  } 

  public getHotelsByHotelierId(id:number) {
    return this.http.get<Hotel[]>(environment.host + '/hotelier/' + id + '/hotels', {
      headers: this.authHeader,
    });
  }

  /**************************************************************
   *
   * HOTELIERS
   *
   **************************************************************/
  public getHoteliers() {
    return this.http.get<Hotelier[]>(environment.host + '/hotelier/all', {
      headers: this.authHeader,
    });
  }

  public getHotelierByUserId(id:number) {
    return this.http.get<Hotelier>(environment.host + '/hotelier/getByUser/' + id, {
      headers: this.authHeader,
    });
  }
}

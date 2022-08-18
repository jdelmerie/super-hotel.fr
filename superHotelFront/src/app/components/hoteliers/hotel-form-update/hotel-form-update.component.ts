import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { Hotel } from 'src/app/models/hotel';
import { Hotelier } from 'src/app/models/hotelier';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/service/api.service';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-hotel-form-update',
  templateUrl: './hotel-form-update.component.html',
  styleUrls: ['./hotel-form-update.component.css'],
})
export class HotelFormUpdateComponent implements OnInit {
  hotel: Hotel | undefined;
  myForm: FormGroup;
  error = null;
  userId:number = this.token.getUserId();
  hotelierId:number = 0;
  cityId:number = 0;
  image: string = "";

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private auth: AuthentificationService,
    private token: TokenService
  ) {
    this.myForm = this.formBuilder.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', Validators.required],
      numberOfRooms: [0, [Validators.required]],
      numberOfStars: [0, [Validators.required]],
      averagePrice: [0, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.auth.isHotelier()) {
      let hotelId = this.route.snapshot.params['id'];
      this.api.getHotel(hotelId).subscribe({
        next: (data) => {
          if (this.userId == data.hotelier.user.id) {
            this.hotel = data;
            this.hotelierId = this.hotel?.hotelier.id;
            this.cityId = this.hotel.city.id;
            this.image = this.hotel.image;
            this.myForm.setValue({
              id: this.hotel.id,
              name: this.hotel.name,
              address: this.hotel.address,
              email: this.hotel.email,
              phone: this.hotel.phone,
              numberOfRooms: this.hotel.numberOfRooms,
              numberOfStars: this.hotel.numberOfStars,
              averagePrice: this.hotel.averagePrice
            });
          } else {
            this.router.navigateByUrl('/hotelier');
          }
        },
        error: () => this.router.navigateByUrl('/hotelier'),
      });
    } else {
      if (this.auth.isAdmin() || this.auth.isUser()) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login');
      }
    }
  }

  onSave(myForm: FormGroup) {
    if (myForm.valid) {
      this.hotel = new Hotel(
        myForm.value.id,
        myForm.value.name,
        myForm.value.address,
        myForm.value.email,
        myForm.value.phone,
        this.image,
        myForm.value.numberOfRooms,
        myForm.value.numberOfStars,
        myForm.value.averagePrice,
        new City(this.cityId, '', '', []),
        new Hotelier(this.hotelierId , '', '', [], new User(this.userId, "", "", "", false, []))
      );

      this.api.updateHotel(this.hotel).subscribe({
        error: (err) => (this.error = err.message),
        complete: () => this.router.navigateByUrl('hotelier'),
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { Hotel } from 'src/app/models/hotel';
import { Hotelier } from 'src/app/models/hotelier';
import { ApiService } from 'src/app/service/api.service';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css'],
})
export class HotelFormComponent implements OnInit {
  title: string = 'Add a new hotel';
  error = null;
  myForm: FormGroup;
  cities: City[] | undefined;
  hoteliers: Hotelier[] | undefined;
  status: boolean = false;
  hotel: Hotel | undefined;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private auth: AuthentificationService
  ) {
    this.myForm = this.formBuilder.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', Validators.required],
      image: [''],
      numberOfRooms: [0, [Validators.required]],
      numberOfStars: [0, [Validators.required]],
      city: [null, [Validators.required]],
      hotelier: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.auth.isAdmin()) {
      let id = this.route.snapshot.params['id'];
      this.getAllCities();
      this.getAllHoteliers();
      if (id > 0) {
        this.title = 'Edit this hotel';
        this.status = true;
        this.api.getHotel(id).subscribe({
          next: (data) => {
            this.hotel = data;
            this.myForm.setValue({
              id: this.hotel.id,
              name: this.hotel.name,
              address: this.hotel.address,
              email: this.hotel.email,
              phone: this.hotel.phone,
              image: '',
              numberOfRooms: this.hotel.numberOfRooms,
              numberOfStars: this.hotel.numberOfStars,
              city: this.hotel.city.id,
              hotelier: this.hotel.hotelier.id,
            });
          },
        });
      }
    } else {
      if (this.auth.isHotelier() || this.auth.isUser()) {
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
        'noimage.png',
        myForm.value.numberOfRooms,
        myForm.value.numberOfStars,
        new City(myForm.value.city, '', '', []),
        new Hotelier(myForm.value.hotelier, '', '', [])
      );

      if (this.status) {
        this.update(this.hotel);
      } else {
        this.add(this.hotel);
      }
    }
  }

  add(hotel: Hotel) {
    this.api.addHotel(hotel).subscribe({
      error: (err) => (this.error = err.message),
      complete: () => this.router.navigateByUrl('admin/hotels'),
    });
  }

  update(hotel: Hotel) {
    this.api.updateHotel(hotel).subscribe({
      error: (err) => (this.error = err.message),
      complete: () => this.router.navigateByUrl('admin/hotels'),
    });
  }

  getAllCities() {
    this.api.getCities().subscribe({
      next: (data) => (this.cities = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  getAllHoteliers() {
    this.api.getHoteliers().subscribe({
      next: (data) => (this.hoteliers = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }
}

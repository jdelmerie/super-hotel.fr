import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel';
import { ApiService } from 'src/app/service/api.service';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotels-admin',
  templateUrl: './hotels-admin.component.html',
  styleUrls: ['./hotels-admin.component.css']
})
export class HotelsAdminComponent implements OnInit {

  hotels: Hotel[] | undefined;
  error: null | undefined;
  url: string = environment.host + '/hotel/image/';
  file: File | undefined;

  constructor(private auth: AuthentificationService, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    if (this.auth.isAdmin()) {
      this.getAllHotels() 
    } else {
      if (this.auth.isHotelier() || this.auth.isUser()) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login');
      }
    }
  }

  getAllHotels() {
    this.api.getHotels().subscribe({
      next: (data) => (this.hotels = data, console.log(data)),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  onUpdate(hotel: Hotel) {
    this.router.navigateByUrl('admin/hotel/' + hotel.id);
  }

  onFileChanged(event: any, hotelId: number) {
    this.file = event.target.files[0];
    const imageData = new FormData();
    imageData.append('image', this.file as Blob);
    imageData.append('hotelId', String(hotelId));
    this.api.uploadImage(imageData).subscribe({
      next: (data) => console.log(data),
      error: (err) => (this.error = err.message),
      complete: () => window.location.reload(),
    });
  }
}

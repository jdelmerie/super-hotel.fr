import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/models/hotel';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
})
export class HotelComponent implements OnInit {
  hotel: Hotel | undefined;
  url: string = environment.host + '/hotel/image/';
  error = null;
  stars: any[] | undefined;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.api.getHotel(id).subscribe({
      next: (data) => (
        (this.hotel = data),
        (this.stars = Array(this.hotel?.numberOfStars)
          .fill(0)
          .map((i) => i))
      ),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }
}

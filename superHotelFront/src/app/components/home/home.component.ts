import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthentificationService) { }

  ngOnInit(): void {
   console.log(this.auth.isAdmin());
   console.log(this.auth.isHotelier());
  }

}

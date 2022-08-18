import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(private auth: AuthentificationService, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    if (this.auth.isUser()) {
      console.log("peut accéder")
    } else {
      if (this.auth.isHotelier() || this.auth.isAdmin()) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login');
      }
    }
  }

}

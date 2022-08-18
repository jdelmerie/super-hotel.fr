import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  displayError: boolean = false;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthentificationService,
    private token: TokenService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.auth.checkIfLogged()) {
      if (this.auth.isAdmin()) {
        this.router.navigateByUrl('/admin');
      }

      if (this.auth.isHotelier()) {
        this.router.navigateByUrl('/hotelier');
      }

      if (this.auth.isUser()) {
        // this.router.navigateByUrl('/user');
      }
    }
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.auth.login(form.value.email, form.value.password).subscribe({
        next: (data) => {
          console.log(data);
          this.token.saveToken(data.token);
          this.token.saveUserId(data.userId);
          window.location.reload();
        },
        error: () => (this.displayError = true),
      });
    }
  }
}

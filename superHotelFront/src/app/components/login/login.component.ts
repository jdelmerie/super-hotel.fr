import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private token: TokenService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.auth.login(form.value.email, form.value.password).subscribe({
        next: (data) => {
          this.token.saveToken(data.token);
          window.location.reload();
        },
        error: () => (this.displayError = true),
      });
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  errorMessage = '';
  isSubmitting = false;

  loginForm;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.http.post<any>(
      '/api/auth/login',
      this.loginForm.value
    ).subscribe({

next: (response) => {

  // Store the JWT returned by the API
  localStorage.setItem(
    'levelUpToken',
    response.token
  );

  // Store basic user information
  localStorage.setItem(
    'levelUpUser',
    JSON.stringify(response.user)
  );

  this.isSubmitting = false;

  this.router.navigate(['/dashboard']);
},

      error: (error) => {

        console.error(error);

        this.errorMessage =
          error.error?.message ||
          'Unable to log in.';

        this.isSubmitting = false;
      }
    });
  }
}
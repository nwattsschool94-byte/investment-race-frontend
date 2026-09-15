import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {
  message = '';
  errorMessage = '';
  isSubmitting = false;

  signupForm;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.message = '';
    this.errorMessage = '';

    this.http
      .post<any>(
        'http://localhost:5031/api/auth/register',
        this.signupForm.value
      )
      .subscribe({
        next: (response) => {
          this.message = response.message;
          this.isSubmitting = false;

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        },
        error: (error) => {
          console.error(error);

          this.errorMessage =
            error.error?.message ||
            error.error?.errors?.join(' ') ||
            'Unable to create account.';

          this.isSubmitting = false;
        }
      });
  }
}
import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {

  username = '';
  email = '';
  password = '';
  isRegister = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  submit() {

    if (this.isRegister) {
      const registerData = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      this.authService.register(registerData).subscribe({
        next: () => {
          alert('Registration successful. Please login.');
          this.isRegister = false;
          this.resetForm();
        },
        error: () => {
          this.error = 'Registration failed';
        }
      });
    } else {
      
    const loginData = {
      username: this.username,
      password: this.password
    };

      this.authService.login(loginData).subscribe({
        next: res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/menu']);
        },
        error: () => {
          this.error = 'Invalid username or password';
        }
      });
    }
  }
  
  resetForm() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.error = '';
    this.cdr.detectChanges();
  }
}

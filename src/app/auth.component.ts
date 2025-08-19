import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLogin = true;
  username = '';
  password = '';
  error = '';

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.error = '';
  }

  async onSubmit() {
    this.error = '';
    const endpoint = this.isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username, password: this.password })
      });
      let data;
      if (res.headers.get('content-type')?.includes('application/json')) {
        data = await res.json();
      } else {
        data = await res.text();
      }
      if (!res.ok) throw new Error(data.message || data || 'Registration/Login failed');
      if (this.isLogin) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        this.isLogin = true;
        this.error = 'Registration successful! Please login.';
      }
    } catch (e: any) {
      this.error = e.message;
    }
  }
}

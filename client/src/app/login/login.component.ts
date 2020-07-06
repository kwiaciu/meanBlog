import { Component } from '@angular/core';
import { ApiService } from '../apiService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  accessToken = null;

  constructor(private apiService: ApiService) {
    this.accessToken = localStorage.getItem('accessToken');
  }

  handleLogin() {
    this.apiService.userLogin(this.email, this.password).then((user) => {
      localStorage.setItem('accessToken', user.token);
      window.location.reload();
    });
  }

  handleLogout() {
    localStorage.removeItem('accessToken');
    window.location.reload();
  }
}

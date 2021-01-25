import { Component, OnInit } from '@angular/core';
import { LoginService } from './auth/services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  async ngOnInit() {
    await this.loginService.loginWithToken();
  }
}

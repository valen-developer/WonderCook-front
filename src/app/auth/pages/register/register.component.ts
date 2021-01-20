import { Component, OnInit } from '@angular/core';
import { UserObjectWithPassword } from 'src/domain/user.model';
import { LoginService } from '../../services/login/login.service';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private registerService: RegisterService) {}

  ngOnInit(): void {}

  private register(): void {
    const newUser: UserObjectWithPassword = {
      alias: 'alias',
      email: 'email',
      name: 'name',
      password: 'password',
      uuid: 'uuid',
      bio: 'bio',
    };
  }
}

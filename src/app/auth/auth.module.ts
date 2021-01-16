import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginService } from './services/login/login.service';
import { RegisterService } from './services/register/register.service';
import { TokenService } from './services/token/token.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LoginService, RegisterService, TokenService],
})
export class AuthModule {}

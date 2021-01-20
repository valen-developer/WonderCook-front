import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginService } from './services/login/login.service';
import { RegisterService } from './services/register/register.service';
import { TokenService } from './services/token/token.service';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BubbleComponent } from '../shared/components/bubble/bubble.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, BubbleComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  providers: [LoginService, RegisterService, TokenService],
})
export class AuthModule {}

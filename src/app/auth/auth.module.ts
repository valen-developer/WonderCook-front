import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//Services

import { LoginService } from './services/login/login.service';
import { RegisterService } from './services/register/register.service';
import { TokenService } from './services/token/token.service';

//Components
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { NotificationCardComponent } from '../shared/components/notification-card/notification-card.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoadingComponent,
    NotificationCardComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  providers: [LoginService, RegisterService, TokenService],
})
export class AuthModule {}

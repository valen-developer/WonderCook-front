import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//NGRX
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './auth/login.reducer';

import { AppComponent } from './app.component';

//Modules
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ logged: loginReducer }),
    BrowserAnimationsModule,
    AuthModule,
    PagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

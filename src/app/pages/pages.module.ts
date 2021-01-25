import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PagesComponent } from './pages.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

//App routing
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent,
    PagesComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
})
export class PagesModule {}

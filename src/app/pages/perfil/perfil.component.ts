import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { User } from 'src/domain/user.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public user: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.userObservable.subscribe((userDB) => {
      this.user = userDB;
    });
  }
}

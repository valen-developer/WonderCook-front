import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public userName: string = '';

  constructor(private userService: UserService) {
    this.userService.userObservable.subscribe((user) => {
      if (user) this.userName = user.name;
    });
  }

  ngOnInit(): void {}
}

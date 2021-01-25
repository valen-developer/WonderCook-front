import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/domain/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User;
  public userObservable: BehaviorSubject<User>;

  constructor() {
    this.userObservable = new BehaviorSubject<User>(null);
  }

  public setUser(user: User): void {
    this.user = user;
    this.userObservable.next(user);
  }
}

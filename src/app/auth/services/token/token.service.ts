import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  get(): string {
    const token = localStorage.getItem('token');

    return token;
  }

  set(token: string): void {
    localStorage.setItem('token', token);
  }
}

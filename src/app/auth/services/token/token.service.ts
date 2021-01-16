import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  get(): string {
    return localStorage.getItem('token');
  }

  set(token: string): void {
    localStorage.setItem('token', token);
  }
}

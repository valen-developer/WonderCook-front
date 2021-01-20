import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RememberEmailService {
  constructor() {}

  getEmail(): RememberEmail {
    const email = localStorage.getItem('email');
    const remember = localStorage.getItem('remember');

    return {
      remember: remember ? (remember === 'true' ? true : false) : false,
      email: email ? email : '',
    };
  }

  setEmail(email: string, remember: boolean): void {
    if (remember) localStorage.setItem('email', email);
    else localStorage.removeItem('email');

    localStorage.setItem('remember', remember ? 'true' : 'false');
  }
}

interface RememberEmail {
  remember: boolean;
  email: string;
}

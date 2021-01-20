import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from 'src/domain/user.model';
import { environment } from 'src/environments/environment.prod';
import { loginAction, logoutAction } from '../../login.actions';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private prefixApiUrl = environment.production
    ? environment.api.prodUrl
    : environment.api.devUrl;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private store: Store<{ logged: boolean }>
  ) {}

  public async login(email: string, password: string): Promise<boolean> {
    try {
      const resp: any = await this.http
        .post(`${this.prefixApiUrl}/user/login`, { email, password })
        .toPromise();

      return this.verifyIfLogged(resp.ok, resp.token);
    } catch (error) {
      return false;
    }
  }

  public async loginWithToken(): Promise<boolean> {
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('token', token);

    try {
      const resp: any = await this.http
        .post(`${this.prefixApiUrl}/user/login`, {}, { headers })
        .toPromise();

      return this.verifyIfLogged(resp.ok, null);
    } catch (error) {
      return false;
    }
  }

  public logOut(): void {
    localStorage.removeItem('token');
    this.store.dispatch(logoutAction());
  }

  private verifyIfLogged(okResponse: boolean, token: string): boolean {
    if (token) this.tokenService.set(token);

    if (okResponse) {
      this.store.dispatch(loginAction());
      return true;
    }

    return false;
  }
}

export interface LoginResponse {
  ok: boolean;
  user?: User;
  error?: string;
}

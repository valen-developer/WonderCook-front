import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from 'src/domain/user.model';
import { environment } from 'src/environments/environment.prod';
import { loginAction, logoutAction } from '../../login.actions';
import { TokenService } from '../token/token.service';
import { UserService } from '../user.service';

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
    private store: Store<{ logged: boolean }>,
    private userService: UserService
  ) {}

  public async login(
    email: string,
    password: string
  ): Promise<{ ok: boolean; message: string }> {
    try {
      const resp: any = await this.http
        .post(`${this.prefixApiUrl}/user/login`, { email, password })
        .toPromise();

      const isLoggeed = this.verifyIfLogged(resp.ok, resp.token);

      if (isLoggeed) {
        this.setUser(resp.user);
        return { ok: true, message: 'logged' };
      }

      return { ok: false, message: resp.error };
    } catch (error) {
      return {
        ok: false,
        message: 'Usuario o contraseña incorrecto',
      };
    }
  }

  public async loginWithToken(): Promise<boolean> {
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('token', token);

    try {
      const resp: any = await this.http
        .post(`${this.prefixApiUrl}/user/login`, {}, { headers })
        .toPromise();

      const isLogged = this.verifyIfLogged(resp.ok, null);

      console.log(`Login with user: ${resp.user.name}`);

      if (isLogged) this.setUser(resp.user);

      return isLogged;
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

  private setUser(userDB: any): void {
    const user = new User({
      alias: userDB.alias,
      createAt: userDB.createAt,
      email: userDB.email,
      name: userDB.name,
      updateAt: userDB.updateAt,
      uuid: userDB.uuid,
      bio: userDB.bio,
    });

    this.userService.setUser(user);
  }
}

export interface LoginResponse {
  ok: boolean;
  user?: User;
  error?: string;
}

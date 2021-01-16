import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/domain/user.model';
import { environment } from 'src/environments/environment.prod';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private prefixApiUrl = environment.production
    ? environment.api.prodUrl
    : environment.api.devUrl;

  constructor(private http: HttpClient, private tokenServie: TokenService) {}

  public async login(email: string, password: string): Promise<LoginResponse> {
    const body = {
      email,
      password,
    };

    try {
      const resp: any = await this.http
        .post(`${this.prefixApiUrl}/user/login`, body)
        .toPromise();

      if (resp.ok)
        return {
          ok: true,
          user: new User(resp.user),
          token: resp.token,
        };

      return {
        ok: false,
        error: resp.error,
      };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  public async loginWithToken(): Promise<LoginWithTokenResponse> {
    const token = this.tokenServie.get();
    const headers = new HttpHeaders().set('token', token);

    try {
      const resp: any = await this.http
        .post(`${this.prefixApiUrl}/login`, headers)
        .toPromise();

      if (resp.ok)
        return {
          ok: true,
          user: new User(resp.user),
        };
      return {
        ok: false,
        error: resp.error,
      };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}

export interface LoginResponse {
  ok: boolean;
  user?: User;
  token?: string;
  error?: string;
}
export interface LoginWithTokenResponse {
  ok: boolean;
  user?: User;
  error?: string;
}

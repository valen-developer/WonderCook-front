import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserObjectWithPassword } from 'src/domain/user.model';
import { environment } from 'src/environments/environment.prod';
import { LoginResponse, LoginWithTokenResponse } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private prefixApiUrl = environment.production
    ? environment.api.prodUrl
    : environment.api.devUrl;

  constructor(private http: HttpClient) {}

  public async register(user: UserObjectWithPassword): Promise<LoginResponse> {
    const body = {
      ...user,
    };

    try {
      const resp: any = await this.http.post(
        `${this.prefixApiUrl}/user/`,
        body
      );

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
      return {
        ok: false,
        error: error.message,
      };
    }
  }
}

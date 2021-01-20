import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserObjectWithPassword } from 'src/domain/user.model';
import { environment } from 'src/environments/environment.prod';
import { LoginResponse } from '../login/login.service';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private prefixApiUrl = environment.production
    ? environment.api.prodUrl
    : environment.api.devUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public async register(user: UserObjectWithPassword): Promise<boolean> {
    try {
      const resp: any = await this.http.post(
        `${this.prefixApiUrl}/user/`,
        user
      );

      if (resp.ok) {
        this.tokenService.set(resp.token);
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}

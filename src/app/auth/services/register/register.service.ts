import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserObjectWithPassword } from 'src/domain/user.model';
import { environment } from 'src/environments/environment.prod';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private prefixApiUrl = environment.production
    ? environment.api.prodUrl
    : environment.api.devUrl;

  constructor(private http: HttpClient) {}

  public async register(
    user: UserObjectWithPassword
  ): Promise<{ ok: boolean; message: string }> {
    try {
      const resp: any = await this.http
        .post(`${this.prefixApiUrl}/user/`, user)
        .toPromise();

      if (resp.ok) {
        return {
          ok: true,
          message: 'Usuario registrado. Acceda a Página de acceso',
        };
      }

      return {
        ok: false,
        message: resp.error,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Registro no realizado',
      };
    }
  }
}

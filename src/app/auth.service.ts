import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './login/usuario';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase;
  tokenURL: string = environment.apiURLBase + environment.obterTokenURL;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiURL}/usuarios`, usuario);
  }

  tentarLogar(usarname: string, password: string): Observable<any> {
    const params = new HttpParams()
                                .set('username', usarname)
                                .set('password', password)
                                .set('grant_type', 'password')

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(this.tokenURL, params.toString(), { headers } )
  }

  obterToken(){
    const tokenString = localStorage.getItem('access_token');

    if(tokenString) {
      const token = JSON.parse(tokenString || '{}').access_token;
      return token;
    }

    return null;
  }

  isAuthenticated(): boolean {
    const token = this.obterToken();

    if(token){
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }

  getUsuarioAutenticado(){
    const token = this.obterToken();

    if(token){
      const usuario = this.jwtHelper.decodeToken(token).user_name;
      return usuario;
    }
    return null;
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UsuarioModel } from '../models/usuario.models';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `https://ti.ucic.pe/api`

  userToken: string;

  constructor( private http: HttpClient ) {
    this.leerToken();
   }

  logOut() {
    localStorage.removeItem('token');
  }

  logIn( usuario: UsuarioModel) {

    const authData = {
      email: usuario.email,
      password: usuario.password
    }
    return this.http.post(`${this.url}/login`
      , authData
    ).pipe(
      map( resp => {
        this.guardarToken(resp['data']['token'])
        return resp 
      }
             
    ))
  }

  private guardarToken( token: string) {
    this.userToken = token;
    localStorage.setItem('token', token)
  }

  leerToken() {
    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else{
      this.userToken = '';
    }

     return this.userToken;
  }

  getAllComments() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.userToken
    });
    return this.http.get(`${this.url}/comments`, { headers: headers })
      .pipe(
        map(resp => {
          return resp})
      )
  }
}

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
    this.readToken();
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
        this.saveToken(resp['data']['token'])
        return resp 
      }
             
    ))
  }

  private saveToken( token: string) {
    this.userToken = token;
    localStorage.setItem('token', token)
  }

  readToken() {
    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else{
      this.userToken = '';
    }

     return this.userToken;
  }

   getUserActive() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.readToken()
    });
    return this.http.get(`${this.url}/get/user`, { headers: headers })     
   }

  getAllComments() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.readToken()
    });
    return this.http.get(`${this.url}/get/comments`, { headers: headers })
  }

  createComment(body: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.readToken()
    });
    return this.http.post(`${this.url}/set/comments`,body, { headers: headers })
  } 
  
}

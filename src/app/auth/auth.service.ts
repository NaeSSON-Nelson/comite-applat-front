import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthResponse } from '../interfaces/auth.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  _usuario!:Usuario;

  get usuario(){
    return {...this._usuario};
  } 
  URL_Auth: string = environment.apiAAPLAT + '/auth';

  constructor(private readonly http: HttpClient) {}

  login(usuario: Usuario) {
    return this.http.post<AuthResponse>(`${this.URL_Auth}/login`, usuario).pipe(
      tap((resp) => {
        if (resp.ok) {
          console.log(resp);
          this._usuario={
            userName:resp.userName!,
            id:resp.id!
          }
          console.log(this._usuario);
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(false))
    );
  }
  validarToken(){
    return this.http.get<AuthResponse>(`${this.URL_Auth}/refresh`).pipe(
      tap((resp) => {
        if (resp.ok) {
          console.log(resp);
          this._usuario={
            userName:resp.userName!,
            id:resp.id!
          }
          console.log(this._usuario);
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(false))
    )
  }
}

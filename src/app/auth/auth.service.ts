import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthResponse } from '../interfaces/auth.interface';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _usuario = signal<Usuario>({});

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  get usuario(){
    return this._usuario.asReadonly();
  } 
  URL_Auth: string = environment.apiAAPLAT + '/auth';

  constructor(private readonly http: HttpClient,
              private readonly messageService:MessageService) {
    effect(()=>{ //EFECTO USUARIO SIGNAL
      console.log('hola usuario',this.usuario());
    })
  }

  login(usuario: Usuario) {
    return this.http.post<AuthResponse>(`${this.URL_Auth}/login`, usuario).pipe(
      tap((resp) => {
        if (resp.ok) {
          console.log(resp);
        localStorage.setItem('token',resp.token!);
          this._usuario.set(resp.usuario);
          console.log(this._usuario());
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(false))
    );
  }
  validarToken(){
    const headers = new HttpHeaders()
      .set('authorization',`Bearer ${localStorage.getItem('token')||''}`);
      console.log(headers);
    return this.http.get<AuthResponse>(`${this.URL_Auth}/refresh`,{headers}).pipe(
      tap((resp) => {
        if (resp.ok) {
          console.log(resp);
          // this._usuario={
          //   userName:resp.userName!,
          //   id:resp.id!
          // }
          console.log(this._usuario);
        }
      }),
      map((resp) => {
        localStorage.setItem('token',resp.token!);
        this._usuario.set(resp.usuario);
        return resp.ok
      }),
      catchError((err) => {
        console.log('hola:3');
        this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warn', detail: 'Message Content',life:2000 });
    
        console.log(err);
        return of(false)
      })
    )
  }
}

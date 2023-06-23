import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpResponseApi, HttpResponseApiArray } from '../interfaces/http-respones.interface';
import { Usuario, UsuarioForm } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL_usuario:string=environment.apiAAPLAT+'/usuarios'
  constructor(private http:HttpClient) {}

  findAll(){
    return this.http.get<HttpResponseApiArray<Usuario>>(`${this.URL_usuario}`).pipe(
    );
  }

  findOne(id:number){
    return this.http.get<HttpResponseApi<Usuario>>(`${this.URL_usuario}/${id}`).pipe(
      
    )
  }
  create(form:UsuarioForm){
    return this.http.post<HttpResponseApi<Usuario>>(`${this.URL_usuario}/create`,form).pipe(
      
    )
  }
  update(id:number,form:UsuarioForm){
    return this.http.patch<HttpResponseApi<Usuario>>(`${this.URL_usuario}/asignRoles/${id}`,form).pipe(

    )
  }
  updateStatus(id:number,form:Usuario){
    return this.http.patch<HttpResponseApi<Usuario>>(`${this.URL_usuario}/status/${id}`,form).pipe(

    )
  }
}

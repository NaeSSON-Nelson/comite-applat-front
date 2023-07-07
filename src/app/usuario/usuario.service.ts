import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponseApi, HttpResponseApiArray } from '../interfaces/http-respones.interface';
import { Usuario, UsuarioCreateResponse, UsuarioForm } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL_usuario:string=environment.apiAAPLAT+'/usuarios';
  private  headers = new HttpHeaders()
      .set('authorization',`Bearer ${localStorage.getItem('token')||''}`);
  constructor(private http:HttpClient) {}

  findAll(){
    return this.http.get<HttpResponseApiArray<Usuario>>(`${this.URL_usuario}`,{headers:this.headers}).pipe(
    );
  }

  findOne(id:number){
    return this.http.get<HttpResponseApi<Usuario>>(`${this.URL_usuario}/${id}`,{headers:this.headers}).pipe(
      
    )
  }
  create(form:UsuarioForm){
    return this.http.post<HttpResponseApi<UsuarioCreateResponse>>(`${this.URL_usuario}/create`,form,{headers:this.headers}).pipe(
      
    )
  }
  update(id:number,form:UsuarioForm){
    return this.http.patch<HttpResponseApi<Usuario>>(`${this.URL_usuario}/asignRoles/${id}`,form,{headers:this.headers}).pipe(

    )
  }
  updateStatus(id:number,form:Usuario){
    return this.http.patch<HttpResponseApi<Usuario>>(`${this.URL_usuario}/status/${id}`,form,{headers:this.headers}).pipe(

    )
  }
}

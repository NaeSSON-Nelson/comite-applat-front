import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Afiliado } from '../interfaces/afiliado.interface';
import { HttpResponseApi, HttpResponseApiArray } from '../interfaces/http-respones.interface';

@Injectable({
  providedIn: 'root'
})
export class AfiliadosService {

  URL_afiliado:string=environment.apiAAPLAT+'/afiliados'
  constructor(private http:HttpClient) {}

  findAll(){
    return this.http.get<HttpResponseApiArray<Afiliado>>(`${this.URL_afiliado}`).pipe(
    );
  }

  findOne(id:number){
    return this.http.get<HttpResponseApi<Afiliado>>(`${this.URL_afiliado}/${id}`).pipe(
      
    )
  }
  create(form:Afiliado){
    return this.http.post<HttpResponseApi<Afiliado>>(`${this.URL_afiliado}`,form).pipe(
      
    )
  }
  updateAfiliado(id:number,afiliado:Afiliado){
    return this.http.patch<HttpResponseApi<Afiliado>>(`${this.URL_afiliado}/${id}`,afiliado).pipe(

    )
  }
  updateStatus(id:number,afiliado:Afiliado){
    return this.http.patch<HttpResponseApi<Afiliado>>(`${this.URL_afiliado}/status/${id}`,afiliado).pipe(

    )
  }
}

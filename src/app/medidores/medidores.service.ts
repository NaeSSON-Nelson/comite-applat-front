import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpResponseApi, HttpResponseApiArray } from '../interfaces/http-respones.interface';
import { Afiliado } from '../interfaces/afiliado.interface';
import { Medidor } from '../interfaces/medidor.interface';

@Injectable({
  providedIn: 'root'
})
export class MedidoresService {
  URL_medidores:string=environment.apiAAPLAT+'/medidores'
  constructor(private http:HttpClient) {}

  findAll(){
    return this.http.get<HttpResponseApiArray<Medidor>>(`${this.URL_medidores}`).pipe(
    );
  }
  findAllMedidoresWithAfiliados(){
    return this.http.get<HttpResponseApiArray<Afiliado>>(`${this.URL_medidores}/afiliados`).pipe(
    );
  }

  findAllMedidoresOneAfiliado(idAfiliado:number){
    return this.http.get<HttpResponseApi<Afiliado>>(`${this.URL_medidores}/afiliado/${idAfiliado}`).pipe(
      
    )
  }
  findOne(id:number){
    return this.http.get<HttpResponseApi<Medidor>>(`${this.URL_medidores}/${id}`).pipe(
      
    )
  }
  create(form:Medidor){
    return this.http.post<HttpResponseApi<Medidor>>(`${this.URL_medidores}`,form).pipe(
      
    )
  }
  update(id:number,form:Medidor){
    return this.http.patch<HttpResponseApi<Medidor>>(`${this.URL_medidores}/${id}`,form).pipe(

    )
  }
  updateStatus(id:number,form:Medidor){
    return this.http.patch<HttpResponseApi<Medidor>>(`${this.URL_medidores}/status/${id}`,form).pipe(

    )
  }

}

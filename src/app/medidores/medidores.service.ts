import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpResponseApi,
  HttpResponseApiArray,
} from '../interfaces/http-respones.interface';
import { Afiliado } from '../interfaces/afiliado.interface';
import { LecturaMedidor, Medidor } from '../interfaces/medidor.interface';

@Injectable({
  providedIn: 'root',
})
export class MedidoresService {
  URL_medidores: string = environment.apiAAPLAT + '/medidores';

  private headers = new HttpHeaders().set(
    'authorization',
    `Bearer ${localStorage.getItem('token') || ''}`
  );
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http
      .get<HttpResponseApiArray<Medidor>>(`${this.URL_medidores}`, {
        headers: this.headers,
      })
      .pipe();
  }
  findAllMedidoresWithAfiliados() {
    return this.http
      .get<HttpResponseApiArray<Afiliado>>(`${this.URL_medidores}/afiliados`, {
        headers: this.headers,
      })
      .pipe();
  }

  findAllMedidoresOneAfiliado(idAfiliado: number) {
    return this.http
      .get<HttpResponseApi<Afiliado>>(
        `${this.URL_medidores}/afiliado/${idAfiliado}`,
        { headers: this.headers }
      )
      .pipe();
  }
  findOne(id: number) {
    return this.http
      .get<HttpResponseApi<Medidor>>(`${this.URL_medidores}/${id}`, {
        headers: this.headers,
      })
      .pipe();
  }
  create(form: Medidor) {
    return this.http
      .post<HttpResponseApi<Medidor>>(`${this.URL_medidores}`, form, {
        headers: this.headers,
      })
      .pipe();
  }
  update(id: number, form: Medidor) {
    return this.http
      .patch<HttpResponseApi<Medidor>>(`${this.URL_medidores}/${id}`, form, {
        headers: this.headers,
      })
      .pipe();
  }
  updateStatus(id: number, form: Medidor) {
    return this.http
      .patch<HttpResponseApi<Medidor>>(
        `${this.URL_medidores}/status/${id}`,
        form,
        { headers: this.headers }
      )
      .pipe();
  }

  //LECTURAS DE MEDIDORES

  registerLectura(lectura: LecturaMedidor) {
    return this.http
      .post<HttpResponseApi<LecturaMedidor>>(
        `${this.URL_medidores}/lectura`,
        lectura, {
          headers: this.headers,
        }
      )
      .pipe();
  }
  updateLecturaMedidor(id: number, lectura: LecturaMedidor) {
    return this.http
      .patch<HttpResponseApi<LecturaMedidor>>(
        `${this.URL_medidores}/lectura/${id}`,
        lectura, {
          headers: this.headers,
        }
      )
      .pipe();
  }
  updateStatusMedidor(id: number, lectura: LecturaMedidor) {
    return this.http
      .patch<HttpResponseApi<LecturaMedidor>>(
        `${this.URL_medidores}/lectura/${id}/status`,
        lectura, {
          headers: this.headers,
        }
      )
      .pipe();
  }
}

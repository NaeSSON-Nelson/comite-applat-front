import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpResponseApi, HttpResponseApiArray } from '../interfaces/http-respones.interface';
import { Role, RoleForm } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  URL_roles:string=environment.apiAAPLAT+'/roles'
  constructor(private http:HttpClient) {}

  findAll(){
    return this.http.get<HttpResponseApiArray<Role>>(`${this.URL_roles}`).pipe(
    );
  }

  findOne(id:number){
    return this.http.get<HttpResponseApi<Role>>(`${this.URL_roles}/${id}`).pipe(
      
    )
  }
  create(form:RoleForm){
    return this.http.post<HttpResponseApi<Role>>(`${this.URL_roles}`,form).pipe(
      
    )
  }
  update(id:number,form:RoleForm){
    return this.http.patch<HttpResponseApi<Role>>(`${this.URL_roles}/${id}`,form).pipe(

    )
  }
  updateStatus(id:number,form:Role){
    return this.http.patch<HttpResponseApi<Role>>(`${this.URL_roles}/status/${id}`,form).pipe(

    )
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponseApi, HttpResponseApiArray } from '../interfaces/http-respones.interface';
import { Role, RoleForm } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  URL_roles:string=environment.apiAAPLAT+'/roles';
  private  headers = new HttpHeaders()
      .set('authorization',`Bearer ${localStorage.getItem('token')||''}`);
  constructor(private http:HttpClient) {}

  findAll(){
    return this.http.get<HttpResponseApiArray<Role>>(`${this.URL_roles}`,{headers:this.headers}).pipe(
    );
  }

  findOne(id:number){
    return this.http.get<HttpResponseApi<Role>>(`${this.URL_roles}/${id}`,{headers:this.headers}).pipe(
      
    )
  }
  create(form:RoleForm){
    return this.http.post<HttpResponseApi<Role>>(`${this.URL_roles}`,form,{headers:this.headers}).pipe(
      
    )
  }
  update(id:number,form:RoleForm){
    return this.http.patch<HttpResponseApi<Role>>(`${this.URL_roles}/${id}`,form,{headers:this.headers}).pipe(

    )
  }
  updateStatus(id:number,form:Role){
    return this.http.patch<HttpResponseApi<Role>>(`${this.URL_roles}/status/${id}`,form,{headers:this.headers}).pipe(

    )
  }
}

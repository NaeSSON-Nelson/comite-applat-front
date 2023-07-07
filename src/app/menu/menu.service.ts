import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Menu } from '../interfaces/menu.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponseApi, HttpResponseApiArray } from '../interfaces/http-respones.interface';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private URL_menu = environment.apiAAPLAT+'/menus';
  private URL_usuario = environment.apiAAPLAT+'/usuarios';
  private URL_roles = environment.apiAAPLAT+'/roles';
  constructor(
    private http:HttpClient,
    private readonly authService:AuthService
  ) { }
  private  headers = new HttpHeaders()
  .set('authorization',`Bearer ${localStorage.getItem('token')||''}`);
  menusUsuarioRoleAuth(idRole:number){
  // return this.http.get<HttpResponseApiArray<Menu>>(`${this.URL_roles}/usuario-roles/${idRole}`).pipe(
    return this.http.get<HttpResponseApi<Usuario>>(`${this.URL_usuario}/roles/${idRole}`,{headers:this.headers});
  }
}

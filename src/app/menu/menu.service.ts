import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Menu } from '../interfaces/menu.interface';
import { HttpClient } from '@angular/common/http';
import { HttpResponseApi, HttpResponseApiArray } from '../interfaces/http-respones.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  URL_menu = environment.apiAAPLAT+'/menus';
  URL_usuario = environment.apiAAPLAT+'/usuarios';
  URL_roles = environment.apiAAPLAT+'/roles';
  constructor(
    private http:HttpClient,
    private readonly authService:AuthService
  ) { }

  menusUsuarioRoleAuth(idRole:number){
  return this.http.get<HttpResponseApiArray<Menu>>(`${this.URL_roles}/usuario-roles/${idRole}`).pipe(

  );
  }
}

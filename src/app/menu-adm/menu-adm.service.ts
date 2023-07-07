import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  HttpResponseApi,
  HttpResponseApiArray,
} from '../interfaces/http-respones.interface';
import { ItemMenu, Menu, MenuForm } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuAdmService {
  URL_menus: string = environment.apiAAPLAT + '/menus';
  URL_itemsMenus: string = environment.apiAAPLAT + '/items-menu';
  constructor(private http: HttpClient) {}

  private  headers = new HttpHeaders()
      .set('authorization',`Bearer ${localStorage.getItem('token')||''}`);
  findAll() {
    return this.http
      .get<HttpResponseApiArray<Menu>>(`${this.URL_menus}`,{headers:this.headers})
      .pipe();
  }

  findOne(id: number) {
    return this.http
      .get<HttpResponseApi<Menu>>(`${this.URL_menus}/${id}`,{headers:this.headers})
      .pipe();
  }
  create(form: MenuForm) {
    return this.http
      .post<HttpResponseApi<Menu>>(`${this.URL_menus}`, form,{headers:this.headers})
      .pipe();
  }
  update(id: number, form: MenuForm) {
    return this.http
      .patch<HttpResponseApi<Menu>>(`${this.URL_menus}/${id}`, form,{headers:this.headers})
      .pipe();
  }
  updateStatus(id: number, form: Menu) {
    return this.http
      .patch<HttpResponseApi<Menu>>(`${this.URL_menus}/status/${id}`, form,{headers:this.headers})
      .pipe();
  }
  findAllItemsMenu() {
    return this.http
      .get<HttpResponseApiArray<ItemMenu>>(`${this.URL_itemsMenus}`,{headers:this.headers})
      .pipe();
  }

  findOneItemMenu(id: number) {
    return this.http
      .get<HttpResponseApi<ItemMenu>>(`${this.URL_itemsMenus}/${id}`,{headers:this.headers})
      .pipe();
  }
  createItemMenu(form: ItemMenu) {
    return this.http
      .post<HttpResponseApi<ItemMenu>>(`${this.URL_itemsMenus}`, form,{headers:this.headers})
      .pipe();
  }
  updateItemMenu(id: number, form: ItemMenu) {
    return this.http
      .patch<HttpResponseApi<Menu>>(`${this.URL_itemsMenus}/${id}`, form,{headers:this.headers})
      .pipe();
  }
  updateItemMenuStatus(id: number, form: ItemMenu) {
    return this.http
      .patch<HttpResponseApi<ItemMenu>>(`${this.URL_itemsMenus}/status/${id}`, form,{headers:this.headers})
      .pipe();
  }
}

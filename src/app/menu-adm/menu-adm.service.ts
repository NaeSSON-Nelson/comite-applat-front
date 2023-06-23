import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
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

  findAll() {
    return this.http
      .get<HttpResponseApiArray<Menu>>(`${this.URL_menus}`)
      .pipe();
  }

  findOne(id: number) {
    return this.http
      .get<HttpResponseApi<Menu>>(`${this.URL_menus}/${id}`)
      .pipe();
  }
  create(form: MenuForm) {
    return this.http
      .post<HttpResponseApi<Menu>>(`${this.URL_menus}`, form)
      .pipe();
  }
  update(id: number, form: MenuForm) {
    return this.http
      .patch<HttpResponseApi<Menu>>(`${this.URL_menus}/${id}`, form)
      .pipe();
  }
  updateStatus(id: number, form: Menu) {
    return this.http
      .patch<HttpResponseApi<Menu>>(`${this.URL_menus}/status/${id}`, form)
      .pipe();
  }
  findAllItemsMenu() {
    return this.http
      .get<HttpResponseApiArray<ItemMenu>>(`${this.URL_itemsMenus}`)
      .pipe();
  }

  findOneItemMenu(id: number) {
    return this.http
      .get<HttpResponseApi<ItemMenu>>(`${this.URL_itemsMenus}/${id}`)
      .pipe();
  }
  createItemMenu(form: ItemMenu) {
    return this.http
      .post<HttpResponseApi<ItemMenu>>(`${this.URL_itemsMenus}`, form)
      .pipe();
  }
  updateItemMenu(id: number, form: ItemMenu) {
    return this.http
      .patch<HttpResponseApi<Menu>>(`${this.URL_itemsMenus}/${id}`, form)
      .pipe();
  }
  updateItemMenuStatus(id: number, form: ItemMenu) {
    return this.http
      .patch<HttpResponseApi<ItemMenu>>(`${this.URL_itemsMenus}/status/${id}`, form)
      .pipe();
  }
}

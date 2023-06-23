import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuAdmComponent } from './menu-adm.component';
import { MenuDetailsComponent } from './menu-details/menu-details.component';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { MenuListarComponent } from './menu-listar/menu-listar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuAdmRoutingModule } from './menu-adm-routing.module';
import { PrimeUiModule } from '../prime-ng/prime-ng.module';
import { MenuAdmService } from './menu-adm.service';
import { ItemMenuComponent } from './item-menu/item-menu.component';
import { ItemMenuListarComponent } from './item-menu-listar/item-menu-listar.component';
import { ItemMenuFormComponent } from './item-menu-form/item-menu-form.component';
import { ItemMenuDetailsComponent } from './item-menu-details/item-menu-details.component';
import { ItemMenuListComponent } from './item-menu-list/item-menu-list.component';
import { AsignarItemComponent } from './asignar-item/asignar-item.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { AsignarMenusComponent } from './asignar-menus/asignar-menus.component';



@NgModule({
  declarations: [
    MenuAdmComponent,
    MenuDetailsComponent,
    MenuFormComponent,
    MenuListarComponent,
    ItemMenuComponent,
    ItemMenuListarComponent,
    ItemMenuFormComponent,
    ItemMenuDetailsComponent,
    ItemMenuListComponent,
    AsignarItemComponent,
    MenuListComponent,
    AsignarMenusComponent
  ],
  imports: [
    CommonModule,
    
    ReactiveFormsModule,
    MenuAdmRoutingModule,



    PrimeUiModule,
  ],
  providers:[
    MenuAdmService
  ],
  exports:[
    MenuListComponent,
    AsignarMenusComponent
  ]
})
export class MenuAdmModule { }

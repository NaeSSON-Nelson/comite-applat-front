import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesFormComponent } from './roles-form/roles-form.component';
import { RolesDetailsComponent } from './roles-details/roles-details.component';
import { RolesListarComponent } from './roles-listar/roles-listar.component';
import { RolesComponent } from './roles.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RolesRoutingModule } from './roles-routing.module';
import { PrimeUiModule } from '../prime-ng/prime-ng.module';
import { RolesService } from './roles.service';
import { MenuAdmModule } from '../menu-adm/menu-adm.module';
import { AsignarRolesComponent } from './asignar-roles/asignar-roles.component';
import { RolesListComponent } from './roles-list/roles-list.component';



@NgModule({
  declarations: [
    RolesFormComponent,
    RolesDetailsComponent,
    RolesListarComponent,
    RolesComponent,
    AsignarRolesComponent,
    RolesListComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RolesRoutingModule,
    MenuAdmModule,


    PrimeUiModule,
  ],
  providers:[
    RolesService
  ],exports:[
    AsignarRolesComponent,
    RolesListComponent
  ]
})
export class RolesModule { }

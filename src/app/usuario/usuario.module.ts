import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioDetailsComponent } from './usuario-details/usuario-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { PrimeUiModule } from '../prime-ng/prime-ng.module';
import { UsuarioService } from './usuario.service';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { RolesModule } from '../roles/roles.module';
import { AfiliadosModule } from '../afiliados/afiliados.module';



@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioFormComponent,
    UsuarioListComponent,
    UsuarioDetailsComponent,
    PerfilFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsuarioRoutingModule,
    RolesModule,
    AfiliadosModule,

    PrimeUiModule,
  ],
  providers:[
    UsuarioService
  ]
})
export class UsuarioModule { }

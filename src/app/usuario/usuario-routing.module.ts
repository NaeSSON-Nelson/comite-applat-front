import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UsuarioComponent,
        pathMatch: 'full',
      },
      {
        path: 'form',
        component: UsuarioFormComponent,
        pathMatch: 'full',
      },
      {
        path: 'perfilForm',
        component: PerfilFormComponent,
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule { }

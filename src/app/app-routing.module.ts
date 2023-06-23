import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: ()=> import('./auth/auth-routing.module').then(m=>m.AuthRoutingModule)
  },
  {
    path:'afiliados',
    loadChildren: ()=> import('./afiliados/afiliados-routing.module').then(m=>m.AfiliadosRoutingModule)
  },
  {
    path:'menus',
    loadChildren: ()=> import('./menu-adm/menu-adm-routing.module').then(m=>m.MenuAdmRoutingModule)
  },
  {
    path:'roles',
    loadChildren: ()=> import('./roles/roles-routing.module').then(m=>m.RolesRoutingModule)
  },
  {
    path:'usuarios',
    loadChildren: ()=> import('./usuario/usuario-routing.module').then(m=>m.UsuarioRoutingModule)
  },
  {
    path:'medidores',
    loadChildren: ()=> import('./medidores/medidores-routing.module').then(m=>m.MedidoresRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { validarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: ()=> import('./auth/auth-routing.module').then(m=>m.AuthRoutingModule)
  },
  {
    path:'afiliados',
    loadChildren: ()=> import('./afiliados/afiliados-routing.module').then(m=>m.AfiliadosRoutingModule),
    canActivate:[validarTokenGuard],
  },
  {
    path:'menus',
    loadChildren: ()=> import('./menu-adm/menu-adm-routing.module').then(m=>m.MenuAdmRoutingModule),
    canActivate:[validarTokenGuard],
  },
  {
    path:'roles',
    loadChildren: ()=> import('./roles/roles-routing.module').then(m=>m.RolesRoutingModule),
    canActivate:[validarTokenGuard],
  },
  {
    path:'usuarios',
    loadChildren: ()=> import('./usuario/usuario-routing.module').then(m=>m.UsuarioRoutingModule),
    canActivate:[validarTokenGuard],
  },
  {
    path:'medidores',
    loadChildren: ()=> import('./medidores/medidores-routing.module').then(m=>m.MedidoresRoutingModule),
    canActivate:[validarTokenGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

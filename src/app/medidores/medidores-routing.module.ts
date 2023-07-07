import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MedidoresComponent } from './medidores.component';
import { MedidorFormComponent } from './medidor-form/medidor-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MedidoresComponent,
        pathMatch: 'full',
      },
      {
        path: 'form',
        component: MedidorFormComponent,
        pathMatch: 'full',
      },
      {
        path: 'lecturas',
        loadChildren: ()=> import('./lecturas/lecturas-routing.module').then(m=>m.LecturasRoutingModule)
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
export class MedidoresRoutingModule { }

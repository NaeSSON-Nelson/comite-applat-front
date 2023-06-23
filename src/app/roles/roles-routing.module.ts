import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles.component';
import { RolesFormComponent } from './roles-form/roles-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RolesComponent,
        pathMatch: 'full',
      },
      {
        path: 'form',
        component: RolesFormComponent,
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
export class RolesRoutingModule { }

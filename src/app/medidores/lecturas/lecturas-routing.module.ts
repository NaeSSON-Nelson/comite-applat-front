import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterAllFormComponent } from './register-all-form/register-all-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RegisterAllFormComponent,
        pathMatch: 'full',
      },
      {
        path: 'individual',
        component: RegisterFormComponent,
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
export class LecturasRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfiliadosComponent } from './afiliados.component';
import { AfiliadoFormComponent } from './afiliado-form/afiliado-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AfiliadosComponent,
        pathMatch: 'full',
      },
      {
        path: 'form',
        component: AfiliadoFormComponent,
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
export class AfiliadosRoutingModule {}

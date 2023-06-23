import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MenuAdmComponent } from './menu-adm.component';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { ItemMenuComponent } from './item-menu/item-menu.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MenuAdmComponent,
        pathMatch: 'full',
      },
      {
        path: 'form',
        component: MenuFormComponent,
        pathMatch: 'full',
      },
      {
        path: 'itemsMenu',
        children: [
          {
            path: '',
            component: ItemMenuComponent,
            pathMatch: 'full',
          },
        ],
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
export class MenuAdmRoutingModule {}

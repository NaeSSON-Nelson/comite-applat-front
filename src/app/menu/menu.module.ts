import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenubarModule } from 'primeng/menubar';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    AuthModule,
  ],
  exports:[
    MenuComponent
  ]
})
export class MenuModule { }

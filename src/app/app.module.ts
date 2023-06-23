import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenuModule } from './menu/menu.module';
import { FooterModule } from './footer/footer.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AfiliadosModule } from './afiliados/afiliados.module';
import { MenuAdmModule } from './menu-adm/menu-adm.module';
import { RolesModule } from './roles/roles.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AuthModule } from './auth/auth.module';
import { MedidoresModule } from './medidores/medidores.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MenuModule,
    FooterModule,
    ToastModule,
    ConfirmDialogModule,
    //MATERIAL SET

    //SALVATION?
    // AfiliadosModule,
    // MenuAdmModule,
    // RolesModule,
    // UsuarioModule,
    // AuthModule,
    // MedidoresModule,
  ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

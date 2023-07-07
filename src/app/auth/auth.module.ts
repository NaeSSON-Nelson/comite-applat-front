import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeUiModule } from '../prime-ng/prime-ng.module';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    LoginComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,

    PrimeUiModule
  ],
  providers:[
    AuthService,
  ]
})
export class AuthModule { }

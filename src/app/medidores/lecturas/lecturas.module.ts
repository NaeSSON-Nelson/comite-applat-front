import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterAllFormComponent } from './register-all-form/register-all-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeUiModule } from 'src/app/prime-ng/prime-ng.module';
import { MedidoresModule } from '../medidores.module';



@NgModule({
  declarations: [
    RegisterFormComponent,
    RegisterAllFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MedidoresModule,
    PrimeUiModule,
  ],
  exports:[
    
  ]
})
export class LecturasModule { }
